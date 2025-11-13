import { STORES } from "#fruit-ninja/app/constants";
import { useActions } from "./fruit-ninja.actions";
import { useGetters } from "./fruit-ninja.getters";

import {
  FRUIT_SCORES,
  FRUIT_TYPES,
  type Fruit,
  type HistoryEntry,
} from "#fruit-ninja/app/types";

export interface FruitNinjaState {
  fruits: Fruit[];
  score: number;
  playing: boolean;
  paused: boolean;

  history: HistoryEntry[];
  fruitImages: Record<string, HTMLImageElement>;
  fruitType: FRUIT_TYPES[];
  fruitScores: Record<FRUIT_TYPES, FRUIT_SCORES>;
}

function mapFruitScores() {
  const entriesFruitScores = Object.entries(FRUIT_SCORES);
  return Object.entries(FRUIT_TYPES).reduce((acc, [key, value]) => {
    acc[value as FRUIT_TYPES] = (entriesFruitScores.find(
      ([k]) => k === key
    )?.[1] || FRUIT_SCORES.BOMB) as FRUIT_SCORES;

    return acc;
  }, {} as Record<FRUIT_TYPES, FRUIT_SCORES>);
}

export const useFruitNinjaStore = defineStore(STORES.FRUIT_NINJA, () => {
  const state = reactive<FruitNinjaState>({
    fruits: [],
    score: 0,
    playing: false,
    paused: false,

    history: [],
    fruitImages: {},

    fruitType: Object.values(FRUIT_TYPES),
    fruitScores: mapFruitScores(),
  });

  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(state),
  };
});
