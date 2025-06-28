import { axiosClient } from "@/common/utils/AxiosClient";

export const getSignedUrl = async (key: string) => {
  const response = await axiosClient.get(`/secure/signed-url?key=${key}`);
  return response.data;
};