import { useQuery } from "@tanstack/react-query";
import { getAllCctv, getDetailCctv, getRamdomCctv, getStarCctv } from "./get.service";

export const useAllCctv = () => {
  return useQuery({
    queryFn: () => getAllCctv(),
    queryKey: ["all-cctv"],
  });
};

export const useDetailCctv = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailCctv(id),
    queryKey: ["detail-cctv", id],
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