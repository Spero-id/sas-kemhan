import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllCctv, ResponseDetailCctv } from "@/types/Cctv/TypeCctv";

export const getAllCctv = async () => {
  const response = await axiosClient.get<ResponseAllCctv>("/secure/cctv");
  return response.data;
};

export const getDetailCctv = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailCctv>(`/secure/cctv/${id}`);
  return response.data;
};