import { REQUIRED_FIELD } from "@/utils/constant";
import { z } from "zod";

const CctvValidation = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  path_slug: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  rtsp_url: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  status: z.preprocess((value) => Boolean(value), z.boolean()),
});

export { CctvValidation };
export type CctvValidationSchema = z.infer<typeof CctvValidation>;
