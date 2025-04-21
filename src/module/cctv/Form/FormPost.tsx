"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PostCctvFunction } from "@/services/api/cctv/post/PostCctvFunction";
import {
  CctvValidation,
  CctvValidationSchema
} from "../Validation";
import FormElement from "./FormElement";

export default function FormPostCctv() {
  const router = useRouter();

  const postCctv = useMutation({
    mutationFn: PostCctvFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit } = useForm<CctvValidationSchema>({
    resolver: zodResolver(CctvValidation),
  });

  const onSubmit: SubmitHandler<CctvValidationSchema> = (
    values: CctvValidationSchema
  ) => {
    postCctv.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/cctv`);
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
