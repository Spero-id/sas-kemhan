"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormElement from "./FormElement";
import { PostBodyWormFunction } from "@/services/api/body_worm/post/PostBodyWormFunction";
import { BodyWormPostSchema, BodyWormPostValidation } from "../Validation";

export default function FormPostBodyWorm() {
  const router = useRouter();

  const postBodyWorm = useMutation({
    mutationFn: PostBodyWormFunction,
  });

  const { control, handleSubmit } = useForm<BodyWormPostSchema>({
    resolver: zodResolver(BodyWormPostValidation),
  });

  const onSubmit: SubmitHandler<BodyWormPostSchema> = (values: BodyWormPostSchema) => {
    postBodyWorm.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/manage/body-worm`);
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
