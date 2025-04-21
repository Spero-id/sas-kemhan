import { axiosClient } from "@/common/utils/AxiosClient";
import { UserRequest, UserResponse } from "@/types/User/TypeUser";

export const UpdateUserFunction = async ({
  id,
  data,
}: {
  id: string;
  data: UserRequest;
}) => {
  const response = await axiosClient.put<UserResponse>(`/secure/user/${id}`, data);
  return response;
};
