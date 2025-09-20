import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Username can't be left empty")
      .min(3, "Username can't be shorter than 3 characters")
      .max(10, "Username lenght can't exceed 10 characters"),
    email: zod.email().nonempty("Email can't be left empty"),
    password: zod
      .string()
      .nonempty("Password can't be left empty")
      .min(8, "Password can't be shorter than 8 characters"),
    rePassword: zod.string().nonempty("Please Confirm Password"),
    phone: zod.string().regex(/^01[1250][0-9]{8}$/),
  }).refine((data) => data.password === data.rePassword, {
    path: ["confirmPassword"],
    error: "Confirm Password field must match Password field!",
  });

export type RegisterSchemaType = zod.infer<typeof registerSchema>