"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDetailCCTV,
} from "@/services/api/cctv/get/get.hooks";
import { useEffect } from "react";
import FormElement from "./FormElement";
import { Alert } from "react-daisyui";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { UpdateCctvFunction } from "@/services/api/cctv/update/UpdateCctvFunction";
import { CctvValidation, CctvValidationSchema } from "../Validation";

interface FormCctvProps {
  id: string;
}

export default function FormEditCctv({ id }: Readonly<FormCctvProps>) {
  const router = useRouter();

  const updateCctv = useMutation({
    mutationFn: UpdateCctvFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit, reset } = useForm<CctvValidationSchema>({
    resolver: zodResolver(CctvValidation),
  });

  const { data, isLoading, error } = useDetailCCTV({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
        path_slug: data?.data.path_slug,
        rtsp_url: data?.data.rtsp_url,
        status: data?.data.status,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<CctvValidationSchema> = (
    values: CctvValidationSchema
  ) => {
    updateCctv.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/cctv`);
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
