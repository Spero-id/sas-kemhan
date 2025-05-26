import { useQuery } from "@tanstack/react-query";
import { getAllRole, getDetailRole } from "./get.service";

export const useAllRole = () => {
  return useQuery({
    queryFn: () => getAllRole(),
    queryKey: ["all"],
  });
};

export const useDetailRole = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailRole(id),
    queryKey: ["detail", id],
  });
};
