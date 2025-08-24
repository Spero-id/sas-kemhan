import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteRecording = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/record?path=${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
