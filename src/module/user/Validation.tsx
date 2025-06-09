import {
  ACCEPTED_IMAGE_TYPES,
  REQUIRED_FIELD,
  SIZE_FILE_LARGE,
  TYPE_FILE_INVALID,
} from "@/utils/constant";
import { z } from "zod";
import {
  checkEmail,
  checkPathSlugBodyWorm,
  checkPathSlugHelmet,
} from "@/services/api/user/get/get.service";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const editSchema = z.object({
  image: z
    .any()
    .nullable()
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }, SIZE_FILE_LARGE.message)
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, TYPE_FILE_INVALID.message),
  password: z
    .string()
    .min(6, {
      message: "Password minimal 6 karakter",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

const postSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== undefined && file !== null, {
      message: REQUIRED_FIELD.message,
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: SIZE_FILE_LARGE.message,
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      TYPE_FILE_INVALID.message
    ),
  password: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .min(6, {
      message: "Password wajib diisi dan minimal 6 karakter",
    }),
});

const defaultSchema = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  email: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .email("Email wajib diisi dengan format email yang benar"),
  role_id: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  name_helmet: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  path_slug_helmet: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Hanya boleh huruf, angka, dan underscore (_), tanpa spasi atau karakter khusus.",
    }),
  rtsp_url_helmet: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  name_body_worm: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  path_slug_body_worm: z
    .string({
      required_error: REQUIRED_FIELD.message,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Hanya boleh huruf, angka, dan underscore (_), tanpa spasi atau karakter khusus.",
    }),
  rtsp_url_body_worm: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
});

const UserPostValidation = z
  .object({
    ...postSchema.shape,
    ...defaultSchema.shape,
  })
  .superRefine(async (data, ctx) => {
    const res = await checkEmail(data.email);

    if (!res.status) {
      ctx.addIssue({
        path: ["email"],
        message: "Email sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }

    const checkHelmet = await checkPathSlugHelmet(
      `helmet_${data.path_slug_helmet}`
    );

    if (!checkHelmet.status) {
      ctx.addIssue({
        path: ["path_slug_helmet"],
        message: "Path slug sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }

    const checkBodyWorm = await checkPathSlugBodyWorm(
      `body_worm_${data.path_slug_body_worm}`
    );

    if (!checkBodyWorm.status) {
      ctx.addIssue({
        path: ["path_slug_body_worm"],
        message: "Path slug sudah digunakan",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const UserEditValidation = (currentUserId: string) =>
  z
    .object({
      ...editSchema.shape,
      ...defaultSchema.shape,
    })
    .superRefine(async (data, ctx) => {
      const res = await checkEmail(data.email, currentUserId);

      if (!res.status) {
        ctx.addIssue({
          path: ["email"],
          message: "Email sudah digunakan oleh user lain",
          code: z.ZodIssueCode.custom,
        });
      }

      const checkHelmet = await checkPathSlugHelmet(
        `helmet_${data.path_slug_helmet}`,
        currentUserId
      );

      if (!checkHelmet.status) {
        ctx.addIssue({
          path: ["path_slug_helmet"],
          message: "Path slug sudah digunakan oleh user lain",
          code: z.ZodIssueCode.custom,
        });
      }

      const checkBodyWorm = await checkPathSlugBodyWorm(
        `body_worm_${data.path_slug_body_worm}`,
        currentUserId
      );

      if (!checkBodyWorm.status) {
        ctx.addIssue({
          path: ["path_slug_body_worm"],
          message: "Path slug sudah digunakan oleh user lain",
          code: z.ZodIssueCode.custom,
        });
      }
    });

export { UserPostValidation, UserEditValidation };
export type UserPostSchema = z.infer<typeof UserPostValidation>;
export type UserEditSchema = z.infer<ReturnType<typeof UserEditValidation>>;
