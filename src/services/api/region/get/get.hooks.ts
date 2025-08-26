import { useQuery } from "@tanstack/react-query";
import { getAllRegion, getDetailRegion } from "./get.service";

export const useAllRegion = () => {
  return useQuery({
    queryFn: () => getAllRegion(),
    queryKey: ["all-region"],
  });
};

export const useDetailRegion = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailRegion(id),
    queryKey: ["detail-region", id],
  });
};
