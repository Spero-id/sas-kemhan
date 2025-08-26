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
import { UpdateCctvFunction } from "@/services/api/cctv/update/UpdateCctvFunction";
import { CctvSchema, CctvValidation } from "../Validation";
import { useDetailCctv } from "@/services/api/cctv/get/get.hooks";

interface FormCctvProps {
  id: string;
}

export default function FormEditCctv({ id }: Readonly<FormCctvProps>) {
  const router = useRouter();

  const updateRole = useMutation({
    mutationFn: UpdateCctvFunction,
  });

  const { control, handleSubmit, reset } = useForm<CctvSchema>({
    resolver: zodResolver(CctvValidation),
  });

  const { data, isLoading, error } = useDetailCctv({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
        path_slug: data?.data.path_slug?.replace("cctv_", "") || "",
        rtsp_url: data?.data.rtsp_url,
        lat: data?.data.lat,
        long: data?.data.long,
        region_id: data?.data.region_id,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<CctvSchema> = (values: CctvSchema) => {
    updateRole.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/manage/cctv`);
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
