import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllPermission } from "@/types/Permission/TypePermission";

export const getAllPermission = async () => {
  const response = await axiosClient.get<ResponseAllPermission>("/secure/permission");
  return response.data;
};
