"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDetailUser,
} from "@/services/api/user/get/get.hooks";
import { useEffect, useState } from "react";
import FormElement from "./FormElement";
import { Alert } from "react-daisyui";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { UpdateUserFunction } from "@/services/api/user/update/UpdateUserFunction";
import { UserEditValidation, UserEditSchema } from "../Validation";
import { FileUploaded } from "@/types/FilePond.type";

interface FormUserProps {
  id: string;
}

export default function FormEditUser({ id }: Readonly<FormUserProps>) {
  const router = useRouter();
  const [valuePhotos, setValuePhotos] = useState<FileUploaded[]>([]);

  const updateUser = useMutation({
    mutationFn: UpdateUserFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit, reset } = useForm<UserEditSchema>({
    resolver: zodResolver(UserEditValidation(id)),
  });

  const { data, isLoading, error } = useDetailUser({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      setValuePhotos([
        {
          id: id,
          path: String(data?.data.image),
        },
      ]);

      reset({
        name: data?.data.name,
        email: data?.data.email,
        name_cctv: data?.data.cctv.name,
        path_slug_cctv: data?.data.cctv.path_slug,
        rtsp_url_cctv: data?.data.cctv.rtsp_url,
        status_cctv: data?.data.cctv.status,
        name_sensor_gerak: data?.data.sensor_gerak.name,
        status_sensor_gerak: data?.data.sensor_gerak.status,
        name_body_worm: data?.data.body_worm.name,
        path_slug_body_worm: data?.data.body_worm.path_slug,
        rtsp_url_body_worm: data?.data.body_worm.rtsp_url,
        status_body_worm: data?.data.body_worm.status,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<UserEditSchema> = (
    values: UserEditSchema
  ) => {
    updateUser.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/user`);
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
        ></FormElement>
      );
    }
  } else {
    content = <LoadingGetData />;
  }

  return <>{content}</>;
}
