import { useQuery } from "@tanstack/react-query";
import { getAllLayout, getDetailLayout, getUserLayout } from "./get.service";

export const useAllLayout = () => {
  return useQuery({
    queryFn: () => getAllLayout(),
    queryKey: ["all-layout"],
  });
};

export const useDetailLayout = ({ id, refetchInterval }: { id: string, refetchInterval?: number }, options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: () => getDetailLayout(id),
    queryKey: ["detail-layout", id],
    enabled: options?.enabled ?? true,
    ...(refetchInterval && { refetchInterval }),
  });
};

export const useLayoutByUser = (regionId?: number) => {
  return useQuery({
    queryFn: () => getUserLayout(regionId),
    queryKey: ["layout-by-user"],
  });
};
