import { checkPathSlugBodyWorm } from "@/services/api/body_worm/get/get.service";
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
  need_convert: z.boolean({
    required_error: REQUIRED_FIELD.message,
  }).optional(),
  region_id: z.string({
    required_error: REQUIRED_FIELD.message,
  }),


});

const BodyWormPostValidation = z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkPathSlugBodyWorm(data.path_slug);

    if (!res.status) {
      ctx.addIssue({
        path: ["path_slug"],
        message: "Path slug sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const BodyWormEditValidation = (id: string) =>
  z
    .object({
      ...defaultSchema.shape,
    })
    .superRefine(async (data, ctx) => {
      const res = await checkPathSlugBodyWorm(data.path_slug, id);

      if (!res.status) {
        ctx.addIssue({
          path: ["path_slug"],
          message: "Path slug sudah digunakan.",
          code: z.ZodIssueCode.custom,
        });
      }
    });

export { BodyWormPostValidation, BodyWormEditValidation };
export type BodyWormPostSchema = z.infer<typeof BodyWormPostValidation>;
export type BodyWormEditSchema = z.infer<ReturnType<typeof BodyWormEditValidation>>;
