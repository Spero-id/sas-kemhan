import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteBodyWorm = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/body-worm/${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
