import { axiosClient } from "@/common/utils/AxiosClient";

export const getDetailSettings = async (name: string) => {
  const response = await axiosClient.get(`/secure/settings/${name}`);
  return response.data;
};