import { z } from "zod";

export const sendOTPPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["creator", "editor"]),
});
