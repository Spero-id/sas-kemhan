"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RolePostSchema, RolePostValidation } from "../Validation";
import FormElement from "./FormElement";
import { PostRoleFunction } from "@/services/api/role/post/PostRoleFunction";

export default function FormPostRole() {
  const router = useRouter();

  const postRole = useMutation({
    mutationFn: PostRoleFunction,
  });

  const { control, handleSubmit } = useForm<RolePostSchema>({
    resolver: zodResolver(RolePostValidation),
  });

  const onSubmit: SubmitHandler<RolePostSchema> = (values: RolePostSchema) => {
    postRole.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/role`);
      },
      onError(error: any) {
        const message =
          error?.response?.data?.message ?? "Telah terjadi kesalahan!";

        toast.error(message);
      },
    });
  };

  return (
    <FormElement
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    ></FormElement>
  );
}
