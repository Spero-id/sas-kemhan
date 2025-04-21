import { REQUIRED_FIELD } from "@/utils/constant";
import { z } from "zod";

const UserValidation = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  email: z.string({
    required_error: REQUIRED_FIELD.message,
  }).email("Email wajib diisi dengan format email yang benar"),
  password: z.string({
    required_error: REQUIRED_FIELD.message,
  }).min(6, {
    message: "Password wajib diisi dan minimal 6 karakter",
  })
});

export { UserValidation };
export type UserValidationSchema = z.infer<typeof UserValidation>;
