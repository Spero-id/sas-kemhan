import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllRole, ResponseDetailRole } from "@/types/Role/TypeRole";

export const getAllRole = async () => {
  const response = await axiosClient.get<ResponseAllRole>("/secure/role");
  return response.data;
};

export const getDetailRole = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailRole>(`/secure/role/${id}`);
  return response.data;
};

export const checkName = async (name: string, id?: string) => {
  const response = await axiosClient.post(`/secure/role/check-name`, { name: name, roleId: id });
  return response.data;
};