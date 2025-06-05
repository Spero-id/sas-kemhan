import { useQuery } from "@tanstack/react-query";
import { getAllCctv, getDetailCctv, getRamdomCctv } from "./get.service";

export const useAllCctv = () => {
  return useQuery({
    queryFn: () => getAllCctv(),
    queryKey: ["all"],
  });
};

export const useDetailCctv = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailCctv(id),
    queryKey: ["detail", id],
  });
};

export const useGetRandomCctv = (limit: number) => {
  return useQuery({
    queryFn: () => getRamdomCctv(limit),
    queryKey: ["random"],
  });
};
