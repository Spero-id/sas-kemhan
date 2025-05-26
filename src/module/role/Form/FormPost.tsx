"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  RoleSchema,
  RoleValidation
} from "../Validation";
import FormElement from "./FormElement";
import { PostRoleFunction } from "@/services/api/role/post/PostRoleFunction";

export default function FormPostRole() {
  const router = useRouter();

  const postRole = useMutation({
    mutationFn: PostRoleFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit } = useForm<RoleSchema>({
    resolver: zodResolver(RoleValidation),
  });

  const onSubmit: SubmitHandler<RoleSchema> = (
    values: RoleSchema
  ) => {
    postRole.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/role`);
      },
      onError() {
        toast.error("Telah terjadi kesalahan!");
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
