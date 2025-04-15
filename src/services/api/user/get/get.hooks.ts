import { useQuery } from "@tanstack/react-query";
import { getUserQueries } from "./get.queries";

export const useAllUser = () => {
  return useQuery({
    ...getUserQueries.all()
  });
};

export const useDetailUser = ({ id }: { id: string }) => {
  return useQuery({
    ...getUserQueries.detail(id)
  });
};