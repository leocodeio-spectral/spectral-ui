import { z } from "zod";

export const signupPayloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().min(10),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  role: z.enum(["creator", "editor"]),
  mailVerificationCode: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  channel: z.enum(["web", "mobile"]),
  profilePicUrl: z.string().min(1),
  language: z.enum(["en", "es", "hi", "ja", "zh"]),
  theme: z.enum(["light", "dark"]),
  timezone: z.string().min(1),
});
