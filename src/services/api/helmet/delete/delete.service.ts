import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteHelmet = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/helmet/${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
