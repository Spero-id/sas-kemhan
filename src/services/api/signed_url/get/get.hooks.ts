import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSignedUrl } from "./get.service";

type SignedUrlParams = {
  key: string;
};

export const useSignedUrl = (
  params: SignedUrlParams,
  options?: Omit<UseQueryOptions<any, unknown, any, any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryFn: () => getSignedUrl(params.key),
    queryKey: ["signed-url", params.key],
    ...options,
  });
};