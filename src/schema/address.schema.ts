import * as zod from "zod";

export const addressSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Provide an address identifier")
      .min(3, "Name can't be shorter than 3 characters"),
    details: zod
      .string()
      .nonempty("Instructions can't be left empty")
      .min(3, "Instructions can't be shorter than 3 characters"),
    phone: zod.string().regex(/^01[1250][0-9]{8}$/),
    city: zod
      .string()
      .nonempty("City can't be left empty")
      .min(3, "City can't be shorter than 3 characters")
  })

export type AddressSchemaType = zod.infer<typeof addressSchema>