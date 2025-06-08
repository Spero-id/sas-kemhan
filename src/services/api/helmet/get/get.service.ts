import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllHelmet } from "@/types/Helmet/TypeHelmet";

export const getAllHelmet = async () => {
  const response = await axiosClient.get<ResponseAllHelmet>("/secure/helmet");
  return response.data;
};

export const getRamdomHelmet = async (limit: number) => {
  const response = await axiosClient.get<ResponseAllHelmet>("/secure/helmet/random?limit=" + limit);
  return response.data;
};