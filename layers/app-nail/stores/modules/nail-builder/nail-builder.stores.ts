import { STORES } from "#app-nail/constants";
import { useActions } from "./nail-builder.actions";
import { useGetters } from "./nail-builder.getters";
import type { NailBuilderState } from "./nail-builder.types";

export const useAppNailBuilderStore = defineStore(STORES.NAIL_BUILDER, () => {
  const state = reactive<NailBuilderState>({});
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(),
  };
});
