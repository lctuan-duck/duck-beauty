import { useActions } from "./confession.actions";
import { useGetters } from "./confession.getters";

import type { ConfessionState } from "./confession.type";
import { CACHE_KEYS, STORES } from "#app-confession/app/constants";
import type { Confession } from "#app-confession/app/types/confession";

export const useConfessionStore = defineStore(STORES.CONFESSION, () => {
  const state = reactive<ConfessionState>({
    confessions: useStorageMap<CACHE_KEYS.CONFESSION, Confession>(
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
