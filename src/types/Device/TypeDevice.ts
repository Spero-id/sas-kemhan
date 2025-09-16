import { Region } from "../Region/TypeRegion";

export type Device = {
  id: number;
  name: string;
  path_slug: string;
  rtsp_url: string;
  lat: string;
  long: string;
  created_at: string;
  updated_at: string;
  region_id: string;
  status: boolean;
  star: boolean;
  regions: Region;
};




export type ResponseAllDevice = {
  status: boolean;
  data: Device[];
  count: {
    cctv: number,
    body_worm: number,
    helmet: number,
    total: number
  }
}

export type DeviceRequest = Partial<{
  name: string;
  path_slug: string;
  rtsp_url: string;
  lat: string;
  long: string;
}>;

export type DeviceResponse = {
  message: string;
};
