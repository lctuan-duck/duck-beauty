<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCameraMotion } from "#fruit-ninja/app/composables/useCameraMotion";

useHead({
  title: "Fruit Ninja - Slash the Fruits with Your Camera",
});

const fruitNinja = useFruitNinjaStore();
const { score, playing, paused, fruits, fruitImages } = storeToRefs(fruitNinja);
const canvas = ref<HTMLCanvasElement | null>(null);

let last = performance.now();
// RAF id so we can cancel it when stopping
let rafId = 0;

// create an off-DOM video element (not shown in template) and pass to composable
const videoEl = document.createElement("video");
videoEl.autoplay = true;
videoEl.playsInline = true;
videoEl.muted = true;
videoEl.style.display = "none";

const { startVideo, motionTrail, procWidth, procHeight, stop } =
  useCameraMotion();

// ============== LOOP & GAME LOGIC ==============
function spawnRandom() {
  const w = canvas!.value!.width;
  const r = 30 + Math.random() * 24;

  fruitNinja.spawn({
    x: Math.random() * w,
    y: canvas!.value!.height + r + 10,
    vx: (Math.random() - 0.5) * 200,
    vy: -600 - Math.random() * 200,
    r,
    type: fruitNinja.randomFruitType(),
  });
}

function pointSegmentDistance(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;
  const dot = A * C + B * D;
  const len2 = C * C + D * D;
  const t = Math.max(0, Math.min(1, len2 === 0 ? 0 : dot / len2));
  const xx = x1 + C * t;
  const yy = y1 + D * t;
  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

function loop(ts = performance.now()) {
  const dt = (ts - last) / 1000;
  last = ts;
  if (!canvas.value) {
    rafId = requestAnimationFrame(loop);
    return;
  }
  const ctx = canvas.value.getContext("2d")!;
  // ensure canvas size matches display
  if (canvas.value.width !== canvas.value.clientWidth) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = Math.floor((canvas.value.clientWidth * 9) / 16);
  }

  const cw = canvas.value.width;
  const ch = canvas.value.height;

  // draw camera frame as background (mirror horizontally for natural feel)
  try {
    ctx.save();
    ctx.translate(cw, 0);
    ctx.scale(-1, 1);
    if (!videoEl.paused && videoEl.readyState >= 2) {
      ctx.drawImage(videoEl, 0, 0, cw, ch);
    } else {
      ctx.clearRect(0, 0, cw, ch);
    }
    ctx.restore();
  } catch (e) {
    console.warn(e);
    ctx.clearRect(0, 0, cw, ch);
  }

  // only update game (spawn, physics, collisions) while playing
  if (playing.value) {
    // spawn logic
    if (Math.random() < 0.02) spawnRandom();

    // update physics
    fruitNinja.tick(dt, cw, ch);
  }

  // draw fruits (overlay on top of camera)
  fruits.value.forEach((f) => {
    if (!fruitImages.value[f.type]) return;

    ctx.save();
    ctx.drawImage(
      fruitImages.value[f.type] as HTMLImageElement,
      f.x - f.r,
      f.y - f.r,
      f.r * 2,
      f.r * 2
    );
    ctx.restore();
  });

  // draw slash trail and collisions only while playing
  if (playing.value && motionTrail.length) {
    ctx.strokeStyle = "rgba(0,255,200,0.85)";
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    const scaleX = canvas.value.width / procWidth;
    const scaleY = canvas.value.height / procHeight;
    for (let i = 0; i < motionTrail.length; i++) {
      const p = motionTrail[i];
      if (!p) continue;
      const x = (procWidth - p.x) * scaleX;
      const y = p.y * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    for (let i = 1; i < motionTrail.length; i++) {
      const a = motionTrail[i - 1];
      const b = motionTrail[i];
      if (!a || !b) continue;
      const ax = (procWidth - a.x) * scaleX,
        ay = a.y * scaleY;
      const bx = (procWidth - b.x) * scaleX,
        by = b.y * scaleY;
      fruits.value.forEach((f) => {
        if (!f.sliced && pointSegmentDistance(f.x, f.y, ax, ay, bx, by) < f.r) {
          fruitNinja.sliceFruit(f.id);
        }
      });
    }
  }

  // schedule next frame and store id
  rafId = requestAnimationFrame(loop);
}

// ============== GAME CONTROL ==============
function clearCanvas() {
  // 🔥 clear canvas
  if (canvas.value) {
    const ctx = canvas.value.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }

  fruits.value = [];
}

async function onStartGame() {
  // avoid starting another loop if one exists
  try {
    if (rafId) return;

    fruitNinja.start();

    await startVideo(videoEl);

    // reset timing to avoid huge dt on resume
    last = performance.now();
    rafId = requestAnimationFrame(loop);
  } catch (_e) {
    fruitNinja.stop();
    return;
  }
}

function onStopGame() {
  // stop game state and camera/composable
  fruitNinja.stop();
  stop();
  // cancel animation frame loop
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  clearCanvas();
}

function onPauseGame() {
  fruitNinja.pause();

  // Dừng vòng lặp
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function onResumeGame() {
  fruitNinja.resume();

  // Tiếp tục video nếu bị dừng
  if (videoEl.paused) videoEl.play();

  // Reset mốc thời gian để không bị nhảy frame lớn
  last = performance.now();

  // Tiếp tục vòng lặp
  rafId = requestAnimationFrame(loop);
}

async function toggleGame() {
  if (playing.value) onStopGame();
  else await onStartGame();
}

function pauseResumeGame() {
  if (!playing.value) return;
  if (fruitNinja.paused) onResumeGame();
  else onPauseGame();
}

onMounted(() => {
  fruitNinja.preloadFruitImages();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[var(--ui-bg)]"
  >
    <div class="relative w-full max-w-6xl overflow-hidden rounded-xl">
      <!-- single canvas: shows camera + game overlay -->
      <canvas
        ref="canvas"
        class="w-full bg-black rounded-lg block h-auto"
      ></canvas>
      <div
        v-if="!playing"
        class="size-full absolute top-0 left-0 flex items-center justify-center"
      >
        <DuckImg
          class="absolute top-0 left-0 w-full h-full object-cover"
          src="/gif/fruit/background.gif"
        />

        <!-- controls -->
        <div
          class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--ui-bg)] bg-opacity-80 rounded-lg p-4 flex flex-col items-center gap-4 z-10"
        >
          <div class="text-lg font-semibold">Fruit Slash Cam</div>
          <div class="flex items-center gap-4">
            <div>
              Score: <b>{{ score }}</b>
            </div>
            <UButton size="md" color="primary" @click="toggleGame">
              {{ playing ? "Stop" : "Start" }}
            </UButton>
          </div>
        </div>
      </div>
      <div
        v-else
        class="size-full absolute top-0 left-0 flex items-center justify-center"
      >
        <!-- top controls -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--ui-bg)]/20 rounded-lg p-2 items-center gap-4 z-10 flex justify-between w-full"
        >
          <div>
            Score: <b>{{ score }}</b>
          </div>
          <div class="flex items-center gap-4">
            <UButton label="Stop" color="primary" @click="toggleGame" />
            <UButton
              :label="paused ? 'Resume' : 'Pause'"
              color="primary"
              @click="pauseResumeGame"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
