"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormElement from "./FormElement";
import { HelmetPostSchema, HelmetPostValidation } from "../Validation";
import { PostHelmetFunction } from "@/services/api/helmet/post/PostHelmetFunction";

export default function FormPostHelmet() {
  const router = useRouter();

  const postHelmet = useMutation({
    mutationFn: PostHelmetFunction,
  });

  const { control, handleSubmit } = useForm<HelmetPostSchema>({
    resolver: zodResolver(HelmetPostValidation),
  });

  const onSubmit: SubmitHandler<HelmetPostSchema> = (values: HelmetPostSchema) => {
    postHelmet.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/manage/helmet`);
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
