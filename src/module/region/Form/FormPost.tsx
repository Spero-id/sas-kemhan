"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RegionPostSchema, RegionPostValidation } from "../Validation";
import FormElement from "./FormElement";
import { PostRegionFunction } from "@/services/api/region/post/PostRegionFunction";

export default function FormPostRegion() {
  const router = useRouter();

  const postRegion = useMutation({
    mutationFn: PostRegionFunction,
  });

  const { control, handleSubmit } = useForm<RegionPostSchema>({
    resolver: zodResolver(RegionPostValidation),
  });

  const onSubmit: SubmitHandler<RegionPostSchema> = (values: RegionPostSchema) => {
    postRegion.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        router.push(`/manage/region`);
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
