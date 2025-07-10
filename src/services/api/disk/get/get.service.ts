import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseDiskUsage } from "@/types/Disk/TypeDisk";

export const getSpaceDisk = async () => {
  const response = await axiosClient.get<ResponseDiskUsage>("/secure/disk");
  return response.data;
};