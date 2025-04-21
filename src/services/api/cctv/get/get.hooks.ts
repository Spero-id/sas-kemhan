import { useQuery } from "@tanstack/react-query";
import { getAllCCTV, getDetailCCTV } from "./get.service";

export const useAllCCTV = () => {
  return useQuery({
    queryFn: () => getAllCCTV(),
    queryKey: ["all"],
  });
};

export const useDetailCCTV = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailCCTV(id),
    queryKey: ["detail", id],
  });
};
