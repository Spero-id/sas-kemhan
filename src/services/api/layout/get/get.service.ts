import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllLayout, ResponseDetailLayout, ResponseUserLayout } from "@/types/Layout/TypeLayout";

export const getAllLayout = async () => {
  const response = await axiosClient.get<ResponseAllLayout>("/secure/layout");
  return response.data;
};

export const getDetailLayout = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailLayout>(`/secure/layout/${id}`);
  return response.data;
};

export const getUserLayout = async (regionId?: number) => {
  console.log(regionId)
  const url = regionId
    ? `/secure/layout/user?region=${regionId}`
    : "/secure/layout/user";
  const response = await axiosClient.get<ResponseUserLayout>(url);
  return response.data;
}