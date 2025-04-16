import { useQuery } from "@tanstack/react-query";
import { getCCTVQueries } from "./get.queries";

export const useAllCCTV = () => {
  return useQuery({
    ...getCCTVQueries.all()
  });
};

export const useDetailCCTV = ({ id }: { id: string }) => {
  return useQuery({
    ...getCCTVQueries.detail(id)
  });
};