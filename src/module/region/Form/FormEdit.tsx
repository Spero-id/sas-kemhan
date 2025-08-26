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
import { RegionEditSchema, RegionEditValidation } from "../Validation";
import { useDetailRole } from "@/services/api/role/get/get.hooks";
import { RolePermission } from "@/types/Role/TypeRole";
import { useDetailRegion } from "@/services/api/region/get/get.hooks";
import { UpdateRegionFunction } from "@/services/api/region/update/UpdateRoleFunction";

interface FormRegionProps {
  id: string;
}

export default function FormEditRegion({ id }: Readonly<FormRegionProps>) {
  const router = useRouter();

  const updateRegion = useMutation({
    mutationFn: UpdateRegionFunction,
  });

  const { control, handleSubmit, reset } = useForm<RegionEditSchema>({
    resolver: zodResolver(RegionEditValidation(id)),
  });

  const { data, isLoading, error } = useDetailRegion({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<RegionEditSchema> = (values: RegionEditSchema) => {
    updateRegion.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/manage/region`);
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
