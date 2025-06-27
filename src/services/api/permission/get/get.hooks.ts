import { useQuery } from "@tanstack/react-query";
import { getAllPermission } from "./get.service";

export const useAllPermission = () => {
  return useQuery({
    queryFn: () => getAllPermission(),
    queryKey: ["all-permission"],
  });
};
