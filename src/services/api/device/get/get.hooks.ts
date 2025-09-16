import { useQuery } from "@tanstack/react-query";
import { getAllDevice } from "./get.service";

export const useAllDevice = (refetchInterval?: number) => {
  return useQuery({
    queryFn: () => getAllDevice(),
    queryKey: ["all-device"],
    ...(refetchInterval && { refetchInterval }),
  });
};
