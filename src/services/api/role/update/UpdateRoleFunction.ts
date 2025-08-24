import { axiosClient } from "@/common/utils/AxiosClient";
import { RoleRequest, RoleResponse } from "@/types/Role/TypeRole";

export const UpdateRoleFunction = async ({
  id,
  data,
}: {
  id: string;
  data: RoleRequest;
}) => {
  try {
    const response = await axiosClient.put<RoleResponse>(`/secure/role/${id}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
