import { z } from "zod";

export const signinPayloadSchema = z
  .object({
    identifier: z.string().refine((val) => {
      // This will be validated based on the type field
      return true; // We'll handle the actual validation in the type field
    }),
    type: z.enum(["email", "mobile"]),
    password: z.string().min(8),
    role: z.enum(["creator", "editor"]),
  })
  .refine(
    (data) => {
      if (data.type === "email") {
        return z.string().email().safeParse(data.identifier).success;
      } else if (data.type === "mobile") {
        return z
          .string()
          .startsWith("+")
          .min(10)
          .max(16)
          .safeParse(data.identifier).success;
      }
      return false;
    },
    {
      message: "Invalid identifier for the specified type",
      path: ["identifier"],
    }
  );

export const mailOtpLoginPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["creator", "editor"]),
});

export const mailOtpLoginVerifyPayloadSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
  name: z.string().min(1),
  role: z.enum(["creator", "editor"]),
});
