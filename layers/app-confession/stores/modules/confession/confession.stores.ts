import { STORES } from "~~/layers/app-confession/constants";
import { useActions } from "./confession.actions";
import { useGetters } from "./confession.getters";

//TODO: change the name of the store
export const useConfessionStore = defineStore(STORES.CONFESSION, () => {
  const state = reactive({});
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(),
  };
});
