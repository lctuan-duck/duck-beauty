/**
 * Use camera motion detection via webcam
 * @param procWidth Processing canvas width default 1920
 * @param procHeight Processing canvas height default 1080
 * @returns { video, startVideo, stop, motionTrail, procWidth, procHeight }
 * - video: ref to HTMLVideoElement
 * - startVideo: function to start video and motion detection
 * - stop: function to stop video and motion detection
 * - motionTrail: reactive array of motion points {x, y, t}
 * - procWidth: processing canvas width
 * - procHeight: processing canvas height
 */
export function useCameraMotion({ procWidth = 1920, procHeight = 1080 } = {}) {
  const video = ref<HTMLVideoElement | null>(null);
  const motionTrail = reactive<{ x: number; y: number; t: number }[]>([]);
  let stream: MediaStream | null = null;
  let raf = 0;
  const proc = document.createElement("canvas");
  proc.width = procWidth;
  proc.height = procHeight;
  const pctx = proc.getContext("2d", { willReadFrequently: true })!;
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

  // Convert ImageData to grayscale
  function toGray(imgd: ImageData) {
    const out = new Uint8ClampedArray(imgd.width * imgd.height);
    const d = imgd.data;
    if (!d) return out;
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      const r = d[i] ?? 0;
      const g = d[i + 1] ?? 0;
      const b = d[i + 2] ?? 0;
      out[j] = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
    }
    return out;
  }

  // Compute difference and centroid of motion
  function diffAndCentroid(currGray: Uint8ClampedArray) {
    // defensive checks
    if (!currGray || currGray.length === 0) return null;
    if (!prevGray || prevGray.length !== currGray.length) {
      // initialize prev frame when missing or size changed
      prevGray = currGray.slice();
      return null;
    }

    const w = proc.width;
    const h = proc.height;
    const prev = prevGray as Uint8ClampedArray; // narrow type for TS

    let sx = 0,
      sy = 0,
      cnt = 0;

    // ensure we don't go out of bounds
    const len = Math.min(currGray.length, prev.length, w * h);
    for (let i = 0; i < len; i++) {
      const cv = currGray[i] ?? 0;
      const pv = prev[i] ?? 0;
      const d = Math.abs(cv - pv);
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

  // Main loop
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

  // Stop video and motion detection
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
