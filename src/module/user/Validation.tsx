import { ACCEPTED_IMAGE_TYPES, REQUIRED_FIELD, SIZE_FILE_LARGE, TYPE_FILE_INVALID } from "@/utils/constant";
import { z, ZodIssueCode } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const FileEdit = z.object({
  file: z
    .array(z.instanceof(File))
    .nullable()
    .optional()
    .superRefine((files, ctx) => {
      if (files !== null && files !== undefined) {
        for (const file of files) {
          if (file) {
            if (file.size > MAX_FILE_SIZE) {
              ctx.addIssue({
                code: ZodIssueCode.too_big,
                message: SIZE_FILE_LARGE.message,
                type: "string",
                maximum: MAX_FILE_SIZE,
                inclusive: false,
              });
            }
            if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
              ctx.addIssue({
                code: ZodIssueCode.invalid_type,
                message: TYPE_FILE_INVALID.message,
                expected: "string",
                received: "string",
              });
            }
          }
        }
      }
    }),
});

const FilePost = z.object({
  file: z.array(z.instanceof(File)).superRefine((files, ctx) => {
    for (const file of files) {
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: ZodIssueCode.too_big,
            message: "File is too large",
            type: "string",
            maximum: MAX_FILE_SIZE,
            inclusive: false,
          });
        }
        if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: ZodIssueCode.invalid_type,
            message: "Invalid file type",
            expected: "string",
            received: "string",
          });
        }
      }
    }
  }),
});

const defaultSchema = z.object({
  ket: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  name: z.string({
    required_error: REQUIRED_FIELD.message,
  }),
  publish: z.preprocess((value) => Boolean(value), z.boolean()),
});

const GaleryPostValidation = z.object({...FilePost.shape, ...defaultSchema.shape});
const GaleryEditValidation = z.object({...FileEdit.shape, ...defaultSchema.shape});

export { GaleryPostValidation, GaleryEditValidation };
export type GaleryPostSchema = z.infer<typeof GaleryPostValidation>;
export type GaleryEditSchema = z.infer<typeof GaleryEditValidation>;
