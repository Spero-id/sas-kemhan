import { useQuery } from "@tanstack/react-query";
import { getAllBodyWorm, getDetailBodyWorm, getRamdomBodyWorm, getStarBodyWorm } from "./get.service";

export const useAllBodyWorm = (refetchInterval?: number) => {
  return useQuery({
    queryFn: () => getAllBodyWorm(),
    queryKey: ["all-body-worm"],
    ...(refetchInterval && { refetchInterval }),
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
    queryKey: ["detail-body-worm", id],
  });
};

export const useGetStarBodyWorm = (refetchInterval?: number) => {
  return useQuery({
    queryFn: () => getStarBodyWorm(),
    queryKey: ["star-body-worm"],
    ...(refetchInterval && { refetchInterval }),
  });
};