import { useQuery } from "@tanstack/react-query";
import { getAllLayout, getDetailLayout, getUserLayout } from "./get.service";

export const useAllLayout = () => {
  return useQuery({
    queryFn: () => getAllLayout(),
    queryKey: ["all-layout"],
  });
};

export const useDetailLayout = ({ id }: { id: string }, options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: () => getDetailLayout(id),
    queryKey: ["detail-layout", id],
    enabled: options?.enabled ?? true,
  });
};

export const useLayoutByUser = () => {
  return useQuery({
    queryFn: () => getUserLayout(),
    queryKey: ["layout-by-user"],
  });
};
