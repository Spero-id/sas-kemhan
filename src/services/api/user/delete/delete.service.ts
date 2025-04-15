import { axiosClient } from "@/common/utils/AxiosClient";

export const deleteUser = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
