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
import { HelmetEditSchema, HelmetEditValidation } from "../Validation";
import { UpdateHelmetFunction } from "@/services/api/helmet/update/UpdateHelmetFunction";
import { useDetailHelmet } from "@/services/api/helmet/get/get.hooks";

interface FormHelmetProps {
  id: string;
}

export default function FormEditHelmet({ id }: Readonly<FormHelmetProps>) {
  const router = useRouter();

  const updateRole = useMutation({
    mutationFn: UpdateHelmetFunction,
  });

  const { control, handleSubmit, reset } = useForm<HelmetEditSchema>({
    resolver: zodResolver(HelmetEditValidation(id)),
  });

  const { data, isLoading, error } = useDetailHelmet({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
        path_slug: data?.data.path_slug?.replace("helmet_", "") || "",
        rtsp_url: data?.data.rtsp_url,
      });
    }
  }, [data, isLoading, reset]);
  
  const onSubmit: SubmitHandler<HelmetEditSchema> = (values: HelmetEditSchema) => {
    updateRole.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/manage/helmet`);
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
