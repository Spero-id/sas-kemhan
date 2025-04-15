"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PostUserFunction } from "@/services/api/user/post/PostUserFunction";
import {
  UserValidation,
  UserValidationSchema
} from "../Validation";
import FormElement from "./FormElement";

export default function FormPostUser() {
  const router = useRouter();

  const postUser = useMutation({
    mutationFn: PostUserFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit } = useForm<UserValidationSchema>({
    resolver: zodResolver(UserValidation),
  });

  const onSubmit: SubmitHandler<UserValidationSchema> = (
    values: UserValidationSchema
  ) => {
    postUser.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/user`);
      }
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
