import { axiosClient } from "@/common/utils/AxiosClient";
import { CCTVRequest, CCTVResponse } from "@/types/CCTV/TypeCCTV";

export const PostCctvFunction = async (data: CCTVRequest) => {
  const response = await axiosClient.post<CCTVResponse>(`/cctv`, data);
  return response;
};