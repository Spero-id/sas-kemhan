"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormElement from "./FormElement";
import { PostCctvFunction } from "@/services/api/cctv/post/PostCctvFunction";
import { CctvSchema, CctvValidation } from "../Validation";

export default function FormPostCctv() {
  const router = useRouter();

  const postCctv = useMutation({
    mutationFn: PostCctvFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit } = useForm<CctvSchema>({
    resolver: zodResolver(CctvValidation),
  });

  const onSubmit: SubmitHandler<CctvSchema> = (
    values: CctvSchema
  ) => {
    console.log(values)
    postCctv.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/cctv`);
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
