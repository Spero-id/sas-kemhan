export type ResponseAllCCTV = {
  status: boolean;
  data: CCTV[];
};

export type ResponseDetailCCTV = {
  status: boolean;
  data: {
    id: string;
    name: string;
    path_slug: string;
    rtsp_url: string;
    status: boolean;
    created_at: string;
    updated_at: string;
  };
};

export type CCTVRequest = Partial<{
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
}>;

export type CCTVResponse = {
  message: string;
};

export type CCTV = Partial<{
  id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}>;
