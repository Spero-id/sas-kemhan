import {
  REQUIRED_FIELD,
} from "@/utils/constant";
import { z } from "zod";

const RoleValidation = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  permissions: z.array(z.string()),
});

export { RoleValidation };
export type RoleSchema = z.infer<typeof RoleValidation>;
