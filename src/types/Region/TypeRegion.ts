export type ResponseAllRegion = {
  status: boolean;
  data: Region[];
};

export type ResponseDetailRegion = {
  status: boolean;
  data: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
};

export type RegionRequest = Partial<{
  name: string;
  permissions: string[];
}>;

export type RegionResponse = {
  message: string;
};

export type Region = Partial<{
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}>;


