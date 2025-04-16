import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllCCTV, ResponseDetailCCTV } from "@/types/CCTV/TypeCCTV";

export const getAllCCTV = async () => {
  const response = await axiosClient.get<ResponseAllCCTV>("/cctv");
  return response.data;
};

export const getDetailCCTV = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailCCTV>(`/cctv/${id}`);
  return response.data;
};
