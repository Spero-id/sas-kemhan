import { checkPathSlugHelmet } from "@/services/api/helmet/get/get.service";
import {
  REQUIRED_FIELD,
} from "@/utils/constant";
import { z } from "zod";

const defaultSchema = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  path_slug: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Hanya boleh huruf, angka, dan underscore (_), tanpa spasi atau karakter khusus.",
    }),
  rtsp_url: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
});

const HelmetPostValidation = z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkPathSlugHelmet(data.path_slug);

    if (!res.status) {
      ctx.addIssue({
        path: ["path_slug"],
        message: "Path slug sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const HelmetEditValidation = (id: string) =>
  z
    .object({
      ...defaultSchema.shape,
    })
    .superRefine(async (data, ctx) => {
      const res = await checkPathSlugHelmet(data.path_slug, id);

      if (!res.status) {
        ctx.addIssue({
          path: ["path_slug"],
          message: "Path slug sudah digunakan.",
          code: z.ZodIssueCode.custom,
        });
      }
    });

export { HelmetPostValidation, HelmetEditValidation };
export type HelmetPostSchema = z.infer<typeof HelmetPostValidation>;
export type HelmetEditSchema = z.infer<ReturnType<typeof HelmetEditValidation>>;
