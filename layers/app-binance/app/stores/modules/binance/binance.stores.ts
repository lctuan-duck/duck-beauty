import { STORES } from "#app-binance/app/constants";
import { useActions } from "./binance.actions";
import { useGetters } from "./binance.getters";

import type { CoinTransaction } from "#app-binance/app/types";

export interface BinanceState {
  coins: number;
  rate: number;
  history: CoinTransaction[];
}

export const useBinanceStore = defineStore(STORES.BINANCE, () => {
  const state = reactive<BinanceState>({
    coins: 1000,
    rate: 23000,
    history: [],
  });
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(state),
  };
});
