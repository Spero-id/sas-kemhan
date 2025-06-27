import { useQuery } from "@tanstack/react-query";
import { getAllLayout, getDetailLayout } from "./get.service";

export const useAllLayout = () => {
  return useQuery({
    queryFn: () => getAllLayout(),
    queryKey: ["all-layout"],
  });
};

export const useDetailLayout = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailLayout(id),
    queryKey: ["detail-layout", id],
  });
};
