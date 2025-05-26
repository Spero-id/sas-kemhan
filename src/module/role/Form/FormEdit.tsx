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
import { RoleSchema, RoleValidation } from "../Validation";
import { UpdateRoleFunction } from "@/services/api/role/update/UpdateRoleFunction";
import { useDetailRole } from "@/services/api/role/get/get.hooks";

interface FormRoleProps {
  id: string;
}

export default function FormEditRole({ id }: Readonly<FormRoleProps>) {
  const router = useRouter();

  const updateRole = useMutation({
    mutationFn: UpdateRoleFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit, reset } = useForm<RoleSchema>({
    resolver: zodResolver(RoleValidation),
  });

  const { data, isLoading, error } = useDetailRole({
    id: id,
  });

  useEffect(() => {
    console.log(data)
    reset({
      name: data?.data.name,
      permissions: data?.data.permissions.map((perm: any) => String(perm.id)),
    });
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<RoleSchema> = (values: RoleSchema) => {
    updateRole.mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          router.push(`/role`);
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
