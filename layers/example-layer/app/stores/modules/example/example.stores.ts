import { STORES } from "#example-layer/app/constants";
import { useActions } from "./example.actions";
import { useGetters } from "./example.getters";

//TODO: change the name of the store
export const useExampleStore = defineStore(STORES.EXAMPLE, () => {
  const state = reactive<{
    message: string;
  }>({
    message: "This is example layer store!",
  });
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(),
  };
});
