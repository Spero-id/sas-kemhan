import { useQuery } from "@tanstack/react-query";
import { getAllBodyWorm, getDetailBodyWorm, getRamdomBodyWorm } from "./get.service";

export const useAllBodyWorm = () => {
  return useQuery({
    queryFn: () => getAllBodyWorm(),
    queryKey: ["all"],
  });
};

export const useGetRandomBodyWorm = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomBodyWorm(limit),
    queryKey: ["random-body-worm"],
  });
};

export const useDetailBodyWorm = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailBodyWorm(id),
    queryKey: ["detail", id],
  });
};