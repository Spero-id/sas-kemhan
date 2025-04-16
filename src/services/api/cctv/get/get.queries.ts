import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getAllCCTV, getDetailCCTV } from "./get.service";

export const getCCTVQueries = createQueryKeys("CCTV", {
  all: () => {
    return {
      queryFn: () => getAllCCTV(),
      queryKey: ["all"],
    };
  },
  detail: (id: string) => {
    return {
      queryFn: () => getDetailCCTV(id),
      queryKey: ["detail", id],
    }
  }
});
