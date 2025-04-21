import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteCCTV = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/cctv/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
