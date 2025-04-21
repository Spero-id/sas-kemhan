import { axiosClient } from "@/common/utils/AxiosClient";
import { CCTVRequest, CCTVResponse } from "@/types/CCTV/TypeCCTV";

export const UpdateCctvFunction = async ({
  id,
  data,
}: {
  id: string;
  data: CCTVRequest;
}) => {
  const response = await axiosClient.put<CCTVResponse>(`/secure/cctv/${id}`, data);
  return response;
};
