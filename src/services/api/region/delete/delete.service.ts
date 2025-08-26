import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteRegion = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/region/${id}`);
    return response.data;
  } catch (error: any) {
    throw error
  }
};
