import { useQuery } from "@tanstack/react-query";
import { getAllUser, getDetailUser } from "./get.service";

export const useAllUser = () => {
  return useQuery({
    queryFn: () => getAllUser(),
    queryKey: ["all"],
  });
};

export const useDetailUser = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailUser(id),
    queryKey: ["detail", id],
  });
};
