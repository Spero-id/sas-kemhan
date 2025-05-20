import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllCctv } from "@/types/Cctv/TypeCctv";

export const getAllCctv = async () => {
  const response = await axiosClient.get<ResponseAllCctv>("/secure/cctv");
  console.log(response)
  return response.data;
};
