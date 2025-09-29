import * as zod from "zod";

export const updateEmailSchema = zod.object({
  email: zod
    .string()
    .email("Invalid email address")
    .nonempty("Email can't be left empty"),
});

export const updateNameSchema = zod.object({
  name: zod
    .string()
    .nonempty("Username can't be left empty")
    .min(3, "Username can't be shorter than 3 characters")
    .max(10, "Username length can't exceed 10 characters"),
});

export const updatePhoneSchema = zod.object({
  phone: zod
    .string()
    .regex(/^01[1250][0-9]{8}$/, "Phone must be a valid Egyptian number"),
});

export const updatePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .nonempty("Current password can't be left empty"),
    password: zod
      .string()
      .nonempty("Password can't be left empty")
      .min(8, "Password can't be shorter than 8 characters"),
    rePassword: zod.string().nonempty("Please confirm password"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Confirm password must match new password!",
  });

export type NameSchemaType = zod.infer<typeof updateNameSchema>;
export type EmailSchemaType = zod.infer<typeof updateEmailSchema>;
export type PhoneSchemaType = zod.infer<typeof updatePhoneSchema>;
export type UpdatePasswordSchemaType = zod.infer<typeof updatePasswordSchema>;
