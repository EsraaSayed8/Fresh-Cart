import * as zod from "zod";

export const emailSchema = zod
  .object({
    email: zod.email().nonempty("Email can't be left empty"),
  })

export const codeSchema = zod
  .object({
    newPassword: zod
      .string()
      .nonempty("Password can't be left empty")
      .min(8, "Password can't be shorter than 8 characters"),
    code: zod.string().regex(/^[0-9]{6}$/),
  })

export type EmailSchemaType = zod.infer<typeof emailSchema>
export type CodeSchemaType = zod.infer<typeof codeSchema>