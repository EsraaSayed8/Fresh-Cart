import * as zod from "zod";

export const loginSchema = zod
  .object({
    email: zod.email().nonempty("Email can't be left empty"),
    password: zod
      .string()
      .nonempty("Password can't be left empty")
      .min(8, "Password can't be shorter than 8 characters"),
  })

export type LoginSchemaType = zod.infer<typeof loginSchema>