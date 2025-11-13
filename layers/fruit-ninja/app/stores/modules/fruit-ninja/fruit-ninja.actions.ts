import { FRUIT_TYPES, type Fruit } from "#fruit-ninja/app/types";
import type { FruitNinjaState } from "./fruit-ninja.stores";

export function useActions(state: FruitNinjaState) {
  function start() {
    state.fruits = [];
    state.score = 0;

    state.playing = true;
    state.paused = false;
  }

  function stop() {
    state.playing = false;
    state.paused = false;
  }

  function pause() {
    state.paused = true;
  }

  function resume() {
    state.paused = false;
  }

  // Spawn a new fruit
  function spawn(f: Omit<Fruit, "id">) {
    state.fruits.push({ id: Date.now().toString(36), ...f });
  }

  // Slice a fruit by id
  function sliceFruit(id: string) {
    const f = state.fruits.find((x) => x.id === id);

    if (f && !f.sliced) {
      f.sliced = true;
      state.score += state.fruitScores[f.type] || FRUIT_TYPES.APPLE;
      // optional remove later
    }
  }

  // Remove all sliced fruits
  function removeSliced() {
    state.fruits = state.fruits.filter((f) => !f.sliced);
  }

  // Update fruit positions
  function tick(dt: number, width: number, height: number) {
    // basic physics update, remove off-screen
    state.fruits.forEach((f) => {
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.vy += 800 * dt; // gravity
    });
    state.fruits = state.fruits.filter(
      (f) => f.y - f.r < height + 200 && !f.sliced
    );
  }

  function randomFruitType() {
    return state.fruitType[
      Math.floor(Math.random() * state.fruitType.length)
    ] as FRUIT_TYPES;
  }

  function preloadFruitImages() {
    for (const type of state.fruitType) {
      const img = new Image();
      img.src = `/images/fruits/${type}.png`;
      state.fruitImages[type] = img;
    }
  }

  return {
    start,
    stop,
    pause,
    resume,
    spawn,
    sliceFruit,
    removeSliced,
    tick,

    randomFruitType,
    preloadFruitImages,
  };
}
