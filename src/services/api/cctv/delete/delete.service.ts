import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteCctv = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/cctv/${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
