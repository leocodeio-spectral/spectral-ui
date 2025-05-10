import { signupPayloadSchema } from "@/services/schemas/signup.schema";
import { signinPayloadSchema, mailOtpLoginPayloadSchema, mailOtpLoginVerifyPayloadSchema } from "@/services/schemas/signin.schema";
import { z } from "zod";
import { sendOTPPayloadSchema } from "~/services/schemas/otp.schema";
import { userExistsPayloadSchema } from "~/services/schemas/user-exists.schema";

export type User = {
  id: string;
  email: string;
  role: string;
};

export type SignupPayload = z.infer<typeof signupPayloadSchema>;
export type SigninPayload = z.infer<typeof signinPayloadSchema>;
export type SendOTPPayload = z.infer<typeof sendOTPPayloadSchema>;
export type UserExistsPayload = z.infer<typeof userExistsPayloadSchema>;
export type MailOtpLoginPayload = z.infer<typeof mailOtpLoginPayloadSchema>;
export type MailOtpLoginVerifyPayload = z.infer<typeof mailOtpLoginVerifyPayloadSchema>;
