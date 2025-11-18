import { useActions } from "./company.actions";
import { useGetters } from "./company.getters";

import { CACHE_KEYS, STORES } from "#app-company/app/constants";
import type { Company } from "#app-company/app/types";
import type { CompanyState } from "./company.type";

export const useCompanyStore = defineStore(STORES.COMPANY, () => {
  const state = reactive<CompanyState>({
    companies: useStorageMap<CACHE_KEYS.COMPANY, Company>(CACHE_KEYS.COMPANY),
    selectedCompany: null,
  });
  return {
    ...toRefs(state),
    ...useGetters(),
    ...useActions(),
  };
});
