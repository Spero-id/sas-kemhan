import {
  REQUIRED_FIELD,
} from "@/utils/constant";
import { z } from "zod";
import { checkName } from "@/services/api/region/get/get.service";

const defaultSchema = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
});

const RegionPostValidation = z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkName(data.name);

    if (!res.status) {
      ctx.addIssue({
        path: ["name"],
        message: "Nama region sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const RegionEditValidation = (currentRegionId: string) => z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkName(data.name, currentRegionId);

    if (!res.status) {
      ctx.addIssue({
        path: ["name"],
        message: "Nama region sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export { RegionPostValidation, RegionEditValidation };
export type RegionPostSchema = z.infer<typeof RegionPostValidation>;
export type RegionEditSchema = z.infer<ReturnType<typeof RegionEditValidation>>;
