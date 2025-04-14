import { useQuery } from "@tanstack/react-query";
import { getGaleryQueries } from "./get.queries";

export const useAllGalery = () => {
  return useQuery({
    ...getGaleryQueries.all(),
  });
};

export const useDetailGalery = ({ id }: { id: string }) => {
  return useQuery({
    ...getGaleryQueries.detail(id),
  });
};

export const useAllPhotosGalery = ({ id }: { id: string }) => {
  return useQuery({
    ...getGaleryQueries.allPhotos(id),
  });
};
