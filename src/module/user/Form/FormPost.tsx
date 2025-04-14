"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PostGaleryFunction } from "@/services/api/galery/post/PostGaleryFunction";
import {
  GaleryPostSchema,
  GaleryPostValidation,
} from "../Validation";
import FormElement from "./FormElement";

export default function FormPostGalery() {
  const router = useRouter();

  const postGalery = useMutation({
    mutationFn: PostGaleryFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { control, handleSubmit } = useForm<GaleryPostSchema>({
    resolver: zodResolver(GaleryPostValidation),
  });

  const onSubmit: SubmitHandler<GaleryPostSchema> = (
    values: GaleryPostSchema
  ) => {
    postGalery.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/galery`);
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
