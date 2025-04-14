"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useAllPhotosGalery,
  useDetailGalery,
} from "@/services/api/galery/get/get.hooks";
import { useEffect, useState } from "react";
import { FileUploaded } from "@/types/FilePond.type";
import { useDeletePhotoGalery } from "@/services/api/galery/deleteFile/delete.hooks";
import { statusDeleteAtom } from "@/common/module/SettingsJotai";
import { useAtom } from "jotai";
import { UpdateGaleryFunction } from "@/services/api/galery/update/UpdateGaleryFunction";
import { GaleryEditSchema, GaleryEditValidation } from "../Validation";
import FormElement from "./FormElement";
import { Alert } from "react-daisyui";
import LoadingGetData from "@/components/Loading/LoadingGetData";

interface FormGaleryProps {
  id?: string;
}

export default function FormEditGalery({ id }: Readonly<FormGaleryProps>) {
  const router = useRouter();
  const [valuePhotos, setValuePhotos] = useState<FileUploaded[]>([]);
  const [statusDelete, setStatusDelete] = useAtom(statusDeleteAtom);
  id = String(id);

  const updateGalery = useMutation({
    mutationFn: UpdateGaleryFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit, reset } = useForm<GaleryEditSchema>({
    resolver: zodResolver(GaleryEditValidation),
  });

  const { data, isLoading, error } = useDetailGalery({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(data?.data.photos)) {
        const photosEdit = data?.data.photos.map((photo) => ({
          id: String(photo.id),
          path: String(photo.path),
          urlDelete: `galery/${id}/file/${photo.id}`,
        }));
        setValuePhotos(photosEdit);
      }

      reset({
        ket: data?.data.ket,
        name: data?.data.name,
        publish: data?.data.publish,
      });
    }
  }, [data, isLoading, reset]);

  const hooksDeleteFile = useDeletePhotoGalery({
    urlDelete: "",
  });

  const { data: dataPhotos, refetch } = useAllPhotosGalery({
    id,
  });

  useEffect(() => {
    if (statusDelete) {
      refetch();
    }

    const updatedPhotos = dataPhotos?.map((photo) => ({
      id: String(photo.id),
      path: String(photo.path),
      urlDelete: `galery/${id}/file/${photo.id}`,
    }));

    setValuePhotos(updatedPhotos ?? []);
    setStatusDelete(null);
  }, [statusDelete, dataPhotos]);

  const onSubmit: SubmitHandler<GaleryEditSchema> = (
    values: GaleryEditSchema
  ) => {
    updateGalery.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/galery`);
        },
      }
    );
  };

  let content;
  if (!isLoading) {
    if (error) {
      content = (
        <Alert className="bg-danger text-white">
          <span>Data tidak ditemukan</span>
        </Alert>
      );
    } else {
      content = (
        <FormElement
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          valuePhotos={valuePhotos}
          hooksDeleteFile={hooksDeleteFile}
        ></FormElement>
      );
    }
  } else {
    content = <LoadingGetData />;
  }

  return <>{content}</>;
}
