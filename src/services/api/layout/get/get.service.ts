import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllLayout, ResponseDetailLayout } from "@/types/Layout/TypeLayout";

export const getAllLayout = async () => {
  const response = await axiosClient.get<ResponseAllLayout>("/secure/layout");
  return response.data;
};

export const getDetailLayout = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailLayout>(`/secure/layout/${id}`);
  return response.data;
};