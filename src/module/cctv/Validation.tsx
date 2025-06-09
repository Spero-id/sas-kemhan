import { REQUIRED_FIELD } from "@/utils/constant";
import { z } from "zod";

const CctvValidation = z.object({
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
  lat: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  long: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
});

export { CctvValidation };
export type CctvSchema = z.infer<typeof CctvValidation>;
