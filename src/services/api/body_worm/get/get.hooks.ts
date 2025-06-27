import { useQuery } from "@tanstack/react-query";
import { getAllBodyWorm, getDetailBodyWorm, getRamdomBodyWorm, getStarBodyWorm } from "./get.service";

export const useAllBodyWorm = () => {
  return useQuery({
    queryFn: () => getAllBodyWorm(),
    queryKey: ["all-body-worm"],
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

export const useGetStarBodyWorm = () => {
  return useQuery({
    queryFn: () => getStarBodyWorm(),
    queryKey: ["star-body-worm"],
  });
};