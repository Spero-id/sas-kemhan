export type ResponseAllGalery = {
  status: boolean;
  data: Galery[];
};

export type ResponseDetailGalery = {
  status: boolean;
  data: {
    id: string;
    name: string;
    ket: string;
    publish: boolean;
    created_at: string;
    updated_at: string;
    photos: GaleryPhoto[];
  };
};

export type ResponseAllPhotosGalery = GaleryPhoto[];

export type GaleryRequest = Partial<{
  name: string;
  publish: boolean;
  ket: string;
  file: File[] | undefined | null;
}>;

export type GaleryResponse = {
  message: string;
};

export type Galery = Partial<{
  id: string;
  name: string;
  ket: string;
  publish: boolean;
  created_at: string;
  updated_at: string;
}>;

export type GaleryPhoto = Partial<{
  id: string;
  path: string;
  galery_id: string;
  created_at: string;
  updated_at: string;
}>;
