import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllBodyWorm, ResponseDetailBodyWorm } from "@/types/BodyWorm/TypeBodyWorm";

export const getAllBodyWorm = async () => {
  const response = await axiosClient.get<ResponseAllBodyWorm>("/secure/body-worm");
  return response.data;
};

export const getRamdomBodyWorm = async (limit: number) => {
  const response = await axiosClient.get<ResponseAllBodyWorm>("/secure/body-worm/random?limit=" + limit);
  return response.data;
};

export const getDetailBodyWorm = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailBodyWorm>(`/secure/body-worm/${id}`);
  return response.data;
};

export const checkPathSlugBodyWorm = async (path_slug: string, id?: string) => {
  const response = await axiosClient.post(`/secure/body-worm/check-path-slug`, { path_slug: path_slug, id: id });
  return response.data;
};