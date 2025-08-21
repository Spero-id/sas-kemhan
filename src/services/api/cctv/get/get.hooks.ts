import { useQuery } from "@tanstack/react-query";
import { getAllCctv, getDetailCctv, getRamdomCctv, getStarCctv } from "./get.service";

export const useAllCctv = (refetchInterval?: number) => {
  return useQuery({
    queryFn: () => getAllCctv(),
    queryKey: ["all-cctv"],
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useDetailCctv = ({ id, refetchInterval }: { id: string; refetchInterval?: number }) => {
  return useQuery({
    queryFn: () => getDetailCctv(id),
    queryKey: ["detail-cctv", id],
    ...(refetchInterval && { refetchInterval }),

  });
};

export const useGetRandomCctv = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomCctv(limit),
    queryKey: ["random-cctv"],
  });
};

export const useGetStarCctv = () => {
  return useQuery({
    queryFn: () => getStarCctv(),
    queryKey: ["star-cctv"],
  });
};