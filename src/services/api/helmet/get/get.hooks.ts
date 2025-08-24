import { useQuery } from "@tanstack/react-query";
import { getAllHelmet, getDetailHelmet, getRamdomHelmet, getStarHelmet } from "./get.service";

export const useAllHelmet = (refetchInterval?: number) => {
  return useQuery({
    queryFn: () => getAllHelmet(),
    queryKey: ["all-helmet"],
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useGetRandomHelmet = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomHelmet(limit),
    queryKey: ["random-helmet"],
  });
};

export const useDetailHelmet = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailHelmet(id),
    queryKey: ["detail-helmet", id],
  });
};

export const useGetStarHelmet = () => {
  return useQuery({
    queryFn: () => getStarHelmet(),
    queryKey: ["star-helmet"],
  });
};