import { useQuery } from "@tanstack/react-query";
import { getAllBodyWorm, getRamdomBodyWorm } from "./get.service";

export const useAllBodyWorm = () => {
  return useQuery({
    queryFn: () => getAllBodyWorm(),
    queryKey: ["all"],
  });
};

export const useGetRandomBodyWorm = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomBodyWorm(limit),
    queryKey: ["random"],
  });
};
