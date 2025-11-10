import type { CACHE_KEYS } from "#app-confession/app/constants";
import type { Confession } from "#app-confession/app/types/confession";

export interface ConfessionState {
  confessions: StorageMap<CACHE_KEYS.CONFESSION, Confession>;
  selectedConfession: Confession | null;
}
