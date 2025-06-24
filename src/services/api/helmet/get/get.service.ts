import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllHelmet, ResponseDetailHelmet } from "@/types/Helmet/TypeHelmet";

export const getAllHelmet = async () => {
  const response = await axiosClient.get<ResponseAllHelmet>("/secure/helmet");
  return response.data;
};

export const getRamdomHelmet = async (limit: number) => {
  const response = await axiosClient.get<ResponseAllHelmet>("/secure/helmet/random?limit=" + limit);
  return response.data;
};

export const getDetailHelmet = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailHelmet>(`/secure/helmet/${id}`);
  return response.data;
};

export const checkPathSlugHelmet = async (path_slug: string, id?: string) => {
  const response = await axiosClient.post(`/secure/helmet/check-path-slug`, { path_slug: path_slug, id: id });
  return response.data;
};