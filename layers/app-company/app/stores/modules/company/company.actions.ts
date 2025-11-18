import type { PaginationMeta, QueryRequest } from "#app-base/types/pagination";
import type { Confession } from "#app-confession/app/types/confession";

export function useActions() {
  async function fetchConfessions(query?: QueryRequest) {
    try {
      const response = await $fetch<PaginationMeta<Confession>>(
        "/api/proxy/v1/confessions",
        { method: "GET", query: query }
      );

      return response.items;
    } catch (error) {
      console.error("Error fetching confessions:", error);
    }
  }

  async function fetchConfessionById(id: string) {
    try {
      const response = await $fetch<Confession>(
        `/api/proxy/v1/confessions/${id}`
      );

      return response;
    } catch (error) {
      console.error("Error fetching confession by ID:", error);
    }
  }

  return { fetchConfessions, fetchConfessionById };
}
