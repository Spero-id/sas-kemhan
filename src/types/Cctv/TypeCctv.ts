export type Cctv = {
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
};

export type ResponseAllCctv = {
  status: boolean;
  data: Cctv[];
}

export type CctvRequest = Partial<{
  name: string;
  path_slug: string;
  rtsp_url: string;
  lat: string;
  long: string;
}>;

export type CctvResponse = {
  message: string;
};

export type ResponseDetailCctv = {
  status: boolean;
  data: {
    id: string;
    name: string;
    path_slug: string;
    rtsp_url: string;
    lat: string;
    long: string;
    star: boolean;
    status: boolean;
    region_id: string;
    created_at: string;
    updated_at: string;
  };
};