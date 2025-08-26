"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FormElement from "./FormElement";
import { Alert } from "react-daisyui";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { UpdateBodyWormFunction } from "@/services/api/body_worm/update/UpdateBodyWormFunction";
import { BodyWormEditSchema, BodyWormEditValidation } from "../Validation";
import { useDetailBodyWorm } from "@/services/api/body_worm/get/get.hooks";

interface FormBodyWormProps {
  id: string;
}

export default function FormEditBodyWorm({ id }: Readonly<FormBodyWormProps>) {
  const router = useRouter();

  const updateRole = useMutation({
    mutationFn: UpdateBodyWormFunction,
  });

  const { control, handleSubmit, reset } = useForm<BodyWormEditSchema>({
    resolver: zodResolver(BodyWormEditValidation(id)),
  });

  const { data, isLoading, error } = useDetailBodyWorm({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
        path_slug: data?.data.path_slug?.replace("body_worm_", "") || "",
        rtsp_url: data?.data.rtsp_url,
        need_convert: data?.data.need_convert || false,
        region_id: data?.data.region_id!.toString() ,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<BodyWormEditSchema> = (values: BodyWormEditSchema) => {
    updateRole.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/manage/body-worm`);
        },
        onError(error: any) {
          const message =
            error?.response?.data?.message ?? "Telah terjadi kesalahan!";

          toast.error(message);
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
        ></FormElement>
      );
    }
  } else {
    content = <LoadingGetData />;
  }

  return <>{content}</>;
}
