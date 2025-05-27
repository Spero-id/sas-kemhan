import {
  REQUIRED_FIELD,
} from "@/utils/constant";
import { z } from "zod";
import { checkName } from "@/services/api/role/get/get.service";

const defaultSchema = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  permissions: z.array(z.string()),
});

const RolePostValidation = z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkName(data.name);

    if (!res.status) {
      ctx.addIssue({
        path: ["name"],
        message: "Nama role sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const RoleEditValidation = (currentRoleId: string) => z
  .object({
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkName(data.name, currentRoleId);

    if (!res.status) {
      ctx.addIssue({
        path: ["name"],
        message: "Nama role sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export { RolePostValidation, RoleEditValidation };
export type RolePostSchema = z.infer<typeof RolePostValidation>;
export type RoleEditSchema = z.infer<ReturnType<typeof RoleEditValidation>>;
