# 🥝 Chém Hoa Quả Bằng Camera (Fruit Slash Cam)

Game mini tương tự **Fruit Ninja**, nhưng người chơi **vung tay trước camera** để chém trái cây trên màn hình.  
Chạy hoàn toàn trên trình duyệt — không cần cài đặt thêm.

---

## 🎯 Mục tiêu

Xây dựng game web sử dụng **camera + xử lý hình ảnh (motion detection)** để nhận diện tay người chơi và chém hoa quả xuất hiện trên canvas.

---

## ⚙️ 1. Chuẩn bị môi trường

### Yêu cầu

- Trình duyệt hỗ trợ `getUserMedia()` (Chrome, Edge, Firefox)...existing code...

# 🥝 Fruit Slash Cam — Hướng dẫn chi tiết tạo game "Chém Hoa Quả" bằng camera

Game nhỏ giống Fruit Ninja nhưng người chơi vung tay trước camera để chém trái cây trên canvas. Tài liệu này mô tả từng bước cần để xây dựng phiên bản chạy trên trình duyệt (HTTPS / localhost).

---

## 🎯 Mục tiêu

- Bắt camera người dùng (getUserMedia).
- So sánh khung hình liên tiếp (frame differencing) để phát hiện chuyển động/đường vung tay.
- Sinh trái cây trên canvas, cập nhật vị trí, và kiểm tra va chạm giữa đường vung tay và trái cây.
- Hiệu ứng/âm thanh cơ bản, tối ưu cho hiệu năng.# 🥝 Fruit Slash Cam — Nuxt 3 + Pinia + Nuxt UI

Phiên bản hướng dẫn này hướng dẫn xây game "Chém Hoa Quả" chạy trên Nuxt 3, sử dụng Pinia để quản lý trạng thái và Nuxt UI cho giao diện. Nội dung gồm các bước cần làm và ví dụ mã nguồn tối thiểu để bạn triển khai nhanh.

---

## Tech stack

- Nuxt 3
- Pinia (state management)
- Nuxt UI (component library)
- TypeScript (tùy chọn)
- Tailwind CSS (nếu có trong project)

---

## Mục tiêu

- Bắt camera người dùng (getUserMedia).
- Phát hiện chuyển động đơn giản (frame differencing) -> tạo "slash trail".
- Sinh trái cây trên canvas, kiểm tra va chạm giữa đường vung và fruit.
- Quản lý trạng thái game bằng Pinia, UI bằng Nuxt UI.

---

## Các bước tổng quan (quick)

1. Đảm bảo modules trong `nuxt.config.ts`: `@pinia/nuxt`, `@nuxt/ui`.
2. Tạo Pinia store: `useGameStore`.
3. Tạo composable xử lý camera + motion: `useCameraMotion`.
4. Tạo page `pages/fruit-ninja/index.vue` dùng canvas + Nuxt UI.
5. Tạo component `Fruit.vue` (render fruit / sliced animation).
6. Chạy `npm run dev`, mở trang `/fruit-ninja`.

---

## 1 — Cấu hình (nuxt.config.ts)

Chắc chắn đã có:

- modules: `@pinia/nuxt`, `@nuxt/ui`
- css: tailwind/main.css (nếu dùng)

(Trong project của bạn các module này đã xuất hiện; nếu chưa, thêm vào.)

---

## 2 — Pinia store (game state & logic spawn / scoring)

```typescript
// filepath: layers/fruit-ninja/stores/useGameStore.ts
import { defineStore } from "pinia";

export type Fruit = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  sliced?: boolean;
};

export const useGameStore = defineStore("fruit-ninja", {
  state: () => ({
    playing: false,
    score: 0,
    fruits: [] as Fruit[],
  }),
  actions: {
    start() {
      this.playing = true;
      this.score = 0;
      this.fruits = [];
    },
    stop() {
      this.playing = false;
    },
    spawn(f: Omit<Fruit, "id">) {
      this.fruits.push({ id: Date.now().toString(36), ...f });
    },
    sliceFruit(id: string) {
      const f = this.fruits.find((x) => x.id === id);
      if (f && !f.sliced) {
        f.sliced = true;
        this.score += 10;
        // optional remove later
      }
    },
    removeSliced() {
      this.fruits = this.fruits.filter((f) => !f.sliced);
    },
    tick(dt: number, width: number, height: number) {
      // basic physics update, remove off-screen
      this.fruits.forEach((f) => {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.vy += 800 * dt; // gravity
      });
      this.fruits = this.fruits.filter(
        (f) => f.y - f.r < height + 200 && !f.sliced
      );
    },
  },
});
```

---

## 3 — Composable camera + motion detection

```ts
// filepath: layers/fruit-ninja/composables/useCameraMotion.ts
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

export function useCameraMotion({ procWidth = 320, procHeight = 240 } = {}) {
  const video = ref<HTMLVideoElement | null>(null);
  const motionTrail = reactive<{ x: number; y: number; t: number }[]>([]);
  let stream: MediaStream | null = null;
  let raf = 0;
  const proc = document.createElement("canvas");
  proc.width = procWidth;
  proc.height = procHeight;
  const pctx = proc.getContext("2d")!;
  let prevGray: Uint8ClampedArray | null = null;

  async function startVideo(el: HTMLVideoElement) {
    video.value = el;
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
    });
    video.value.srcObject = stream;
    await video.value.play();
    loop();
  }

  function toGray(imgd: ImageData) {
    const out = new Uint8ClampedArray(imgd.width * imgd.height);
    const d = imgd.data;
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      out[j] = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) | 0;
    }
    return out;
  }

  function diffAndCentroid(currGray: Uint8ClampedArray) {
    if (!prevGray) {
      prevGray = currGray.slice();
      return null;
    }
    const w = proc.width,
      h = proc.height;
    let sx = 0,
      sy = 0,
      cnt = 0;
    for (let i = 0; i < w * h; i++) {
      const d = Math.abs(currGray[i] - prevGray[i]);
      if (d > 30) {
        // threshold
        const y = (i / w) | 0;
        const x = i % w;
        sx += x;
        sy += y;
        cnt++;
      }
    }
    prevGray = currGray.slice();
    if (!cnt) return null;
    // scale to video size later by caller
    return { x: sx / cnt, y: sy / cnt };
  }

  function loop() {
    if (!video.value) return;
    pctx.drawImage(video.value, 0, 0, proc.width, proc.height);
    const imgd = pctx.getImageData(0, 0, proc.width, proc.height);
    const gray = toGray(imgd);
    const c = diffAndCentroid(gray);
    if (c) {
      // scale to video/canvas resolution by caller; store raw pixel coords for now
      motionTrail.push({ x: c.x, y: c.y, t: Date.now() });
      if (motionTrail.length > 12) motionTrail.shift();
    }
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
  }

  onBeforeUnmount(stop);

  return {
    video,
    startVideo,
    stop,
    motionTrail,
    procWidth,
    procHeight,
  };
}
```

---

## 4 — Page chính (Nuxt page)

```vue
// filepath: layers/fruit-ninja/pages/fruit-ninja/index.vue
<template>
  <div class="min-h-screen flex flex-col items-center bg-[var(--ui-bg)]">
    <div class="w-full max-w-3xl p-4">
      <UCard>
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">Fruit Slash Cam</div>
          <div class="flex items-center gap-4">
            <div>
              Score: <b>{{ game.score }}</b>
            </div>
            <UButton size="sm" color="primary" @click="toggle">
              {{ game.playing ? "Stop" : "Start" }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <div class="relative w-full max-w-3xl flex-1">
      <video ref="camEl" autoplay playsinline class="hidden"></video>
      <canvas ref="gameCanvas" class="w-full bg-black rounded-lg"></canvas>
      <!-- optional: overlay UI -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGameStore } from "~/layers/fruit-ninja/stores/useGameStore";
import { useCameraMotion } from "~/layers/fruit-ninja/composables/useCameraMotion";

const game = useGameStore();
const camEl = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

const { startVideo, motionTrail, procWidth, procHeight, stop } =
  useCameraMotion();

let last = performance.now();

function toggle() {
  if (game.playing) {
    game.stop();
    stop();
  } else {
    game.start();
    if (camEl.value) startVideo(camEl.value);
    requestAnimationFrame(loop);
  }
}

function spawnRandom() {
  const w = canvas!.value!.width;
  const r = 30 + Math.random() * 24;
  game.spawn({
    x: Math.random() * w,
    y: canvas!.value!.height + r + 10,
    vx: (Math.random() - 0.5) * 200,
    vy: -600 - Math.random() * 200,
    r,
  });
}

function loop(ts = performance.now()) {
  const dt = (ts - last) / 1000;
  last = ts;
  if (!canvas.value) return;
  const ctx = canvas.value.getContext("2d")!;
  // ensure canvas size matches display
  if (canvas.value.width !== canvas.value.clientWidth) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = Math.floor((canvas.value.clientWidth * 9) / 16);
  }

  // spawn logic
  if (Math.random() < 0.02) spawnRandom();

  // update physics
  game.tick(dt, canvas.value.width, canvas.value.height);

  // draw
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  // draw fruits
  game.fruits.forEach((f) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = f.sliced ? "rgba(255,100,100,0.6)" : "white";
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // draw slash trail: map proc coords -> canvas coords
  if (motionTrail.length) {
    ctx.strokeStyle = "rgba(0,255,200,0.85)";
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    const scaleX = canvas.value.width / procWidth;
    const scaleY = canvas.value.height / procHeight;
    for (let i = 0; i < motionTrail.length; i++) {
      const p = motionTrail[i];
      const x = p.x * scaleX;
      const y = p.y * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // collision check: segments vs fruits
    for (let i = 1; i < motionTrail.length; i++) {
      const a = motionTrail[i - 1];
      const b = motionTrail[i];
      const ax = a.x * scaleX,
        ay = a.y * scaleY;
      const bx = b.x * scaleX,
        by = b.y * scaleY;
      game.fruits.forEach((f) => {
        if (!f.sliced && pointSegmentDistance(f.x, f.y, ax, ay, bx, by) < f.r) {
          game.sliceFruit(f.id);
        }
      });
    }
  }

  requestAnimationFrame(loop);
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

onMounted(() => {
  // optional: set initial canvas size
  if (canvas.value) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = Math.floor((canvas.value.clientWidth * 9) / 16);
  }
});
</script>

<style scoped>
canvas {
  display: block;
  height: auto;
}
</style>
```

---

## 5 — Luồng test & chạy

1. Chạy dev server: npm run dev
2. Mở trang: http://localhost:3000/fruit-ninja
3. Cho phép camera; nhấn Start; vung tay trước camera để tạo trail và chém fruit.

---

## 6 — Tối ưu & cải tiến

- Dùng OpenCV.js cho contour detection và ridge detection nếu cần chính xác.
- Xử lý motion detection trong Web Worker để không chặn UI.
- Cắt fruit bằng sprite halves; thêm âm thanh bằng <audio>.
- Điều chỉnh threshold / blur tuỳ ánh sáng môi trường.

---

Nếu muốn, tôi có thể:

- Tạo các file mẫu đầy đủ (components, store, composable, page) trong workspace.
- Viết phiên bản dùng OpenCV.js hoặc Worker.

---

## ⚙️ Yêu cầu

- Trình duyệt hỗ trợ getUserMedia().
- Chạy trên HTTPS hoặc localhost.
- File chính: `index.html`, `style.css`, `main.js`.
- (Tùy chọn) OpenCV.js nếu muốn xử lý chính xác hơn.

---

## 📁 Cấu trúc thư mục

- index.html
- style.css
- main.js
- assets/
  - fruits/\*.png
  - slash-sound.mp3

---

## 1 — Thiết lập HTML cơ bản

- Một video ẩn để lấy khung hình camera.
- Một canvas chính để render game.
- Nút bắt đầu / reset.

Ví dụ tối giản:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Fruit Slash Cam</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <video id="cam" autoplay playsinline style="display:none;"></video>
      <canvas id="game"></canvas>
      <div id="ui">
        <button id="startBtn">Bắt đầu</button>
        <div id="score">Score: 0</div>
      </div>
    </div>
    <script src="main.js" type="module"></script>
  </body>
</html>
```

---

## 2 — CSS cơ bản

Đặt canvas full-screen hoặc trong vùng chơi; giữ đơn giản, responsive.

---

## 3 — Luồng chính trong JavaScript (ý tưởng)

1. startGame():
   - Yêu cầu camera (navigator.mediaDevices.getUserMedia).
   - Gán stream cho video element.
   - Khởi tạo offscreen canvas để xử lý khung hình (resized, grayscale).
2. gameLoop() (requestAnimationFrame):
   - Lấy khung hình hiện tại từ video vào processing canvas.
   - So sánh với khung hình trước (frame differencing).
   - Áp blur/threshold để loại nhiễu nhỏ.
   - Tìm contours / vùng chuyển động -> trích đường vung hoặc trung tâm vùng.
   - Lưu trữ đường vung gần nhất (một mảng điểm với timestamp).
   - Cập nhật vị trí trái cây (rơi lên/đi theo đường cong).
   - Kiểm tra va chạm giữa đường vung (segment list) và bounding box / circle của trái cây.
   - Nếu va chạm: đánh dấu trái cây bị chém (animation, tăng điểm), phát âm thanh.
   - Vẽ mọi thứ lên canvas (trái cây, đường vung tạm, điểm, hiệu ứng).
3. Throttle/tune:
   - Giảm độ phân giải xử lý (ví dụ 320x240) để tăng FPS.
   - Dùng offscreen Canvas để xử lý ảnh.

---

## 4 — Thuật toán phát hiện chuyển động đơn giản

- Lấy 2 khung liên tiếp I(t) và I(t-1).
- grayscale(I), blur nhẹ (5x5).
- D = abs(I(t) - I(t-1)).
- threshold(D, 30) -> nhị phân.
- Morphological open/close nhỏ (optional) để lọc nhiễu.
- Tìm region lớn nhất: dùng connected components hoặc scan line để tìm bounding box.
- Lấy centroid region làm điểm chuyển động.
- Lưu chuỗi centroid nhiều frame để xác định hướng vung (một vector/segment).

---

## 5 — Kiểm tra va chạm (line vs circle/rect)

- Mỗi trái cây có vị trí (x,y) và bán kính r.
- Đường vung là tập các segment (p0->p1, p1->p2...).
- Dùng kiểm tra khoảng cách điểm-đoạn: nếu khoảng cách từ tâm trái cây đến segment < r => trúng.
- Sau khi trúng, gán trạng thái sliced, tạo hiệu ứng phân mảnh hoặc biến mất.

---

## 6 — Mã ví dụ chính (rút gọn)

- Tập trung vào phần xử lý ảnh cơ bản + logic trò chơi.

```javascript
// main.js (tối giản, ý tưởng)
const video = document.getElementById("cam");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const proc = document.createElement("canvas");
const pctx = proc.getContext("2d");

let prevFrame = null;
let motionTrail = []; // điểm chuyển động gần nhất
let fruits = [];
let score = 0;

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 },
  });
  video.srcObject = stream;
  await video.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  proc.width = 320;
  proc.height = 240; // xử lý ở độ phân giải thấp hơn
}

function toGray(imgData) {
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = data[i + 1] = data[i + 2] = v;
  }
  return imgData;
}

function diffFrames(a, b) {
  const w = a.width,
    h = a.height;
  const out = new Uint8ClampedArray(w * h);
  for (let i = 0; i < w * h; i++) {
    const va = a.data[i * 4];
    const vb = b.data[i * 4];
    out[i] = Math.abs(va - vb);
  }
  return out;
}

function thresholdMask(diff, w, h, thresh = 30) {
  const mask = new Uint8ClampedArray(w * h);
  for (let i = 0; i < w * h; i++) mask[i] = diff[i] > thresh ? 255 : 0;
  return mask;
}

function findCentroid(mask, w, h) {
  let sx = 0,
    sy = 0,
    c = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x]) {
        sx += x;
        sy += y;
        c++;
      }
    }
  }
  if (!c) return null;
  return {
    x: (sx / c) * (canvas.width / w),
    y: (sy / c) * (canvas.height / h),
  };
}

function update() {
  // vẽ video xuống proc canvas nhỏ
  pctx.drawImage(video, 0, 0, proc.width, proc.height);
  let img = pctx.getImageData(0, 0, proc.width, proc.height);
  img = toGray(img);
  pctx.putImageData(img, 0, 0);

  if (prevFrame) {
    const diff = diffFrames(img, prevFrame);
    const mask = thresholdMask(diff, proc.width, proc.height, 25);
    const c = findCentroid(
      { data: mask, width: proc.width, height: proc.height },
      proc.width,
      proc.height
    );
    if (c) {
      motionTrail.push({ x: c.x, y: c.y, t: Date.now() });
      if (motionTrail.length > 10) motionTrail.shift();
    }
  }
  prevFrame = new ImageData(
    new Uint8ClampedArray(img.data),
    img.width,
    img.height
  );

  // update fruits, check collisions with motionTrail segments...
  // draw game visuals on main canvas
  requestAnimationFrame(update);
}

document.getElementById("startBtn").addEventListener("click", async () => {
  await setupCamera();
  update();
});
```

> Lưu ý: đoạn mã trên là bản ý tưởng rút gọn — cần bổ sung xử lý memory (copy ImageData đúng), tìm contour tốt hơn, morph ops, và logic fruits.

---

## 7 — Tối ưu & tips

- Xử lý ở độ phân giải thấp (e.g. 320x240) để tăng tốc.
- Dùng requestAnimationFrame, và throttle tốc độ xử lý ảnh (vd mỗi 2 frame xử lý).
- Dùng WebWorker để tách phần xử lý ảnh nặng.
- Nếu cần chính xác hơn, dùng OpenCV.js để tìm contours và convex hull.
- Bật giảm nhiễu: gaussian blur, morphological open/close.

---

## 8 — Triển khai & kiểm thử

- Trên development: chạy bằng `npx http-server . -c-1` hoặc serve trên localhost; đảm bảo trang load qua http://localhost (getUserMedia cho phép).
- Trên production: host qua HTTPS (Netlify, Vercel, GitHub Pages + custom domain với HTTPS).
- Thử nghiệm trong điều kiện ánh sáng khác nhau, chỉnh threshold.

---

## 9 — Nâng cao (tùy chọn)

- Thêm nhiều loại trái cây với tốc độ khác nhau.
- Hiệu ứng cắt (animation, rotate halves).
- Hệ thống combo/time bonus, leaderboard.
- Hỗ trợ nhiều ngôn ngữ, accessibility.

---

## 10 — Tài nguyên tham khảo

- MDN: MediaDevices.getUserMedia
- OpenCV.js docs
- Ví dụ frame differencing, motion detection tutorials

---

Nếu cần, tôi có thể:

- Viết full ví dụ `index.html`, `style.css`, `main.js` hoàn chỉnh.
- Hoặc cung cấp phiên bản dùng OpenCV.js để phát hiện contour chính xác hơn.
- Chạy trên **HTTPS** hoặc **localhost**
- Một file duy nhất `index.html`

### Cấu trúc thư mục
