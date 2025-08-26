import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllRegion, ResponseDetailRegion } from "@/types/Region/TypeRegion";

export const getAllRegion = async () => {
  const response = await axiosClient.get<ResponseAllRegion>("/secure/region");
  return response.data;
};

export const getDetailRegion = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailRegion>(`/secure/region/${id}`);
  return response.data;
};

export const checkName = async (name: string, id?: string) => {
  const response = await axiosClient.post(`/secure/region/check-name`, { name: name, regionId: id });
  return response.data;
};
