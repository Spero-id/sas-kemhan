import { axiosClient } from "@/common/utils/AxiosClient";

export const getAllRecording = async (path_slug: string) => {
  const response = await axiosClient.get(`/secure/record/list?dir=${path_slug}`);
  return response.data;
};