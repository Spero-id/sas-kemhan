import { useQuery } from "@tanstack/react-query";
import { allUser, getAllUser, getDetailUser } from "./get.service";

export const useAllUser = () => {
  return useQuery({
    queryFn: () => getAllUser(),
    queryKey: ["get-all-user"],
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryFn: () => allUser(),
    queryKey: ["all-user"],
  });
};

export const useDetailUser = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => getDetailUser(id),
    queryKey: ["detail-user", id],
  });
};
