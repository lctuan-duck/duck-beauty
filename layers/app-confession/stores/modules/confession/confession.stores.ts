import { CACHE_KEYS, STORES } from "~~/layers/app-confession/constants";
import { useActions } from "./confession.actions";
import { useGetters } from "./confession.getters";
import type { ConfessionState } from "./confession.type";
import type { ConfessionResponse } from "~~/layers/app-confession/types/confession";
import { useStorageMap } from "~/composables/use-storage-map";

export const useConfessionStore = defineStore(STORES.CONFESSION, () => {
  const state = reactive<ConfessionState>({
    confessions: useStorageMap<CACHE_KEYS.CONFESSION, ConfessionResponse>(
      CACHE_KEYS.CONFESSION
    ),
    selectedConfession: null,
  });
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(),
  };
});
