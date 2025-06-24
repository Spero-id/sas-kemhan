export type Helmet = {
  id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ResponseAllHelmet = {
  status: boolean;
  data: Helmet[];
}

export type HelmetRequest = Partial<{
  name: string;
  path_slug: string;
  rtsp_url: string;
  lat: string;
  long: string;
}>;

export type HelmetResponse = {
  message: string;
};

export type ResponseStatusHelmet = {
  message: string;
};

export type ResponseDetailHelmet = {
  status: boolean;
  data: Helmet;
};