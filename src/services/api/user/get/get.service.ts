import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllUser, ResponseDetailUser } from "@/types/User/TypeUser";

export const getAllUser = async () => {
  const response = await axiosClient.get<ResponseAllUser>("/user");
  return response.data;
};

export const getDetailUser = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailUser>(`/user/${id}`);
  return response.data;
};
