import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getAllUser, getDetailUser } from "./get.service";

export const getUserQueries = createQueryKeys("user", {
  all: () => {
    return {
      queryFn: () => getAllUser(),
      queryKey: ["all"],
    };
  },
  detail: (id: string) => {
    return {
      queryFn: () => getDetailUser(id),
      queryKey: ["detail", id],
    }
  }
});
