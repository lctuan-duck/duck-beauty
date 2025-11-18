import type { CACHE_KEYS } from "#app-company/app/constants";
import type { Company } from "#app-company/app/types";

export interface CompanyState {
  companies: StorageMap<CACHE_KEYS.COMPANY, Company>;
  selectedCompany: Company | null;
}
