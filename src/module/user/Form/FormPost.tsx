"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PostUserFunction } from "@/services/api/user/post/PostUserFunction";
import { UserPostValidation, UserPostSchema } from "../Validation";
import FormElement from "./FormElement";

export default function FormPostUser() {
  const router = useRouter();

  const postUser = useMutation({
    mutationFn: PostUserFunction,
  });

  const { control, handleSubmit } = useForm<UserPostSchema>({
    resolver: zodResolver(UserPostValidation),
  });

  const onSubmit: SubmitHandler<UserPostSchema> = (values: UserPostSchema) => {
    postUser.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/user`);
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
