import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllUser, ResponseDetailUser } from "@/types/User/TypeUser";

export const getAllUser = async () => {
  const response = await axiosClient.get<ResponseAllUser>("/secure/user");
  return response.data;
};

export const getDetailUser = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailUser>(`/secure/user/${id}`);
  return response.data;
};

export const checkEmail = async (email: string, id?: string) => {
  const response = await axiosClient.post(`/secure/user/check-email`, { email: email, userId: id });
  return response.data;
};

export const checkPathSlugHelmet = async (path_slug: string, id?: string) => {
  const response = await axiosClient.post(`/secure/user/check-path-slug/helmet`, { path_slug: path_slug, userId: id });
  return response.data;
};

export const allUser = async () => {
  const response = await axiosClient.get<ResponseAllUser>("/secure/user/all");
  return response.data;
};
