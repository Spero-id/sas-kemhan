"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDetailUser,
} from "@/services/api/user/get/get.hooks";
import { useEffect } from "react";
import FormElement from "./FormElement";
import { Alert } from "react-daisyui";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { UpdateUserFunction } from "@/services/api/user/update/UpdateUserFunction";
import { UserValidation, UserValidationSchema } from "../Validation";

interface FormUserProps {
  id?: string;
}

export default function FormEditUser({ id }: Readonly<FormUserProps>) {
  const router = useRouter();

  const updateUser = useMutation({
    mutationFn: UpdateUserFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit, reset } = useForm<UserValidationSchema>({
    resolver: zodResolver(UserValidation),
  });

  const { data, isLoading, error } = useDetailUser({
    id: id,
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.name,
        email: data?.data.email,
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<UserValidationSchema> = (
    values: UserValidationSchema
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
        ></FormElement>
      );
    }
  } else {
    content = <LoadingGetData />;
  }

  return <>{content}</>;
}
