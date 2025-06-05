import { useQuery } from "@tanstack/react-query";
import { getAllHelmet, getRamdomHelmet } from "./get.service";

export const useAllHelmet = () => {
  return useQuery({
    queryFn: () => getAllHelmet(),
    queryKey: ["all"],
  });
};

export const useGetRandomHelmet = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomHelmet(limit),
    queryKey: ["random"],
  });
};