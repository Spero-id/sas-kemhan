import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteGalery = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/galery/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
