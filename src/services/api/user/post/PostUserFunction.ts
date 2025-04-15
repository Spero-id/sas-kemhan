import { axiosClient } from "@/common/utils/AxiosClient";
import { UserRequest, UserResponse } from "@/types/User/TypeUser";

export const PostUserFunction = async (data: UserRequest) => {
  const response = await axiosClient.post<UserResponse>(`/user`, data);
  return response;
};