import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getAllGalery, getAllPhotosGalery, getDetailGalery } from "./get.service";

export const getGaleryQueries = createQueryKeys("galery", {
  all: () => {
    return {
      queryFn: () => getAllGalery(),
      queryKey: ["all"],
    };
  },
  detail: (id: string) => {
    return {
      queryFn: () => getDetailGalery(id),
      queryKey: ["detail", id],
    }
  },
  allPhotos: (id: string) => {
    return {
      queryFn: () => getAllPhotosGalery(id),
      queryKey: ["allPhotos", id]
    }
  }
});
