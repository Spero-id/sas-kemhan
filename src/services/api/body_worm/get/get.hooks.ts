import { useQuery } from "@tanstack/react-query";
import { getAllBodyWorm } from "./get.service";

export const useAllBodyWorm = () => {
  return useQuery({
    queryFn: () => getAllBodyWorm(),
    queryKey: ["all"],
  });
};
