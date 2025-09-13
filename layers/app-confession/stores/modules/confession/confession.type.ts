import type { StorageMap } from "~/composables/use-storage-map";
import type { CACHE_KEYS } from "~~/layers/app-confession/constants";
import type { ConfessionResponse } from "~~/layers/app-confession/types/confession";

export interface ConfessionState {
  confessions: StorageMap<CACHE_KEYS.CONFESSION, ConfessionResponse>;
  selectedConfession: ConfessionResponse | null;
}
