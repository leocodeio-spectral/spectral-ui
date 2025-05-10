import { type ActionFunctionArgs } from "@remix-run/node";
import { signin, signup } from "@/services/auth.server";
import {
  SendOTPPayload,
  SigninPayload,
  SignupPayload,
  User,
  UserExistsPayload,
} from "@/types/user";
import {
  ActionResultError,
  ActionResultSuccess,
  ORIGIN,
} from "@/types/action-result";
import { signupPayloadSchema } from "@/services/schemas/signup.schema";
import { userSession } from "@/services/sessions.server";
import { sendOTPPayloadSchema } from "~/services/schemas/otp.schema";
import { userExistsPayloadSchema } from "~/services/schemas/user-exists.schema";
import { isUserExists, sendMailOtp } from "~/services/verfication.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("debug log 1 - signup.action.ts", data);
  const verificationStep = data.verificationStep;
  // console.log("verificationStep", verificationStep);
  if (verificationStep === "details") {
    // email exists check
    const userExistsPayload = {
      identifier: data.email,
      type: "email",
      role: data.role,
    } as UserExistsPayload;
    const parsedUserExistsPayload =
      userExistsPayloadSchema.safeParse(userExistsPayload);
    if (!parsedUserExistsPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedUserExistsPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedUserExistsPayload.error.issues[0].message,
        data: parsedUserExistsPayload.data,
      };
      return Response.json(result, { status: 400 });
    }
    const userExistsResult = await isUserExists(
      parsedUserExistsPayload.data,
      request
    );
    if (!userExistsResult.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: userExistsResult.origin,
        message: userExistsResult.message,
        data: userExistsResult.data,
      };
      return Response.json(result, { status: 400 });
    }

    // if user exists, return error
    if (userExistsResult.data?.data) {
      const result: ActionResultError<any> = {
        success: false,
        origin: "email",
        message: "User already exists",
        data: null,
      };
      return Response.json(result, { status: 400 });
    }

    // phone exists check
    const phoneExistsPayload = {
      identifier: data.phone,
      type: "mobile",
      role: data.role,
    } as UserExistsPayload;
    const parsedPhoneExistsPayload =
      userExistsPayloadSchema.safeParse(phoneExistsPayload);
    if (!parsedPhoneExistsPayload.success) {
      console.log("user exists validation phone error");
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedPhoneExistsPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedPhoneExistsPayload.error.issues[0].message,
        data: parsedPhoneExistsPayload.data,
      };
      return Response.json(result, { status: 400 });
    }
    const phoneExistsResult = await isUserExists(
      parsedPhoneExistsPayload.data,
      request
    );
    if (!phoneExistsResult.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: phoneExistsResult.origin,
        message: phoneExistsResult.message,
        data: phoneExistsResult.data,
      };
      return Response.json(result, { status: 400 });
    }

    // if phone exists, return error
    if (phoneExistsResult.data?.data) {
      const result: ActionResultError<any> = {
        success: false,
        origin: "phone",
        message: "User already exists",
        data: null,
      };
      return Response.json(result, { status: 400 });
    }

    // send otp to email
    const otpPayload = {
      email: data.email,
      name: data.name,
      role: data.role,
    } as SendOTPPayload;
    const parsedOTPPayload = sendOTPPayloadSchema.safeParse(otpPayload);
    if (!parsedOTPPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedOTPPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedOTPPayload.error.issues[0].message,
        data: parsedOTPPayload.data,
      };
      return Response.json(result, { status: 400 });
    }

    const sendMailOtpResult = await sendMailOtp(parsedOTPPayload.data, request);
    if (!sendMailOtpResult.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: sendMailOtpResult.origin,
        message: sendMailOtpResult.message,
        data: sendMailOtpResult.data,
      };
      return Response.json(result, { status: 400 });
    }

    return Response.json(
      {
        success: true,
        origin: "email" as ORIGIN,
        message: "OTP sent to email",
        data: null,
      },
      { status: 200 }
    );
  } else if (verificationStep === "otp") {
    const signupPayload = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
      channel: "web",
      name: data.name,
      mobile: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      profilePicUrl: data.profilePicUrl,
      language: "en",
      theme: "dark",
      timezone: "Asia/Kolkata",
      mailVerificationCode: data.otp,
    } as SignupPayload;
    console.log("1");
    console.log(signupPayload);

    // parse with zod
    const parsedSignupPayload = signupPayloadSchema.safeParse(signupPayload);
    console.log("2");
    console.log(parsedSignupPayload);
    if (!parsedSignupPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedSignupPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedSignupPayload.error.issues[0].message,
        data: parsedSignupPayload.data,
      };
      return Response.json(result, { status: 400 });
    }
    console.log("4");

    const signupResult = await signup(parsedSignupPayload.data, request);
    console.log("3");
    const session = await userSession(request);
    console.log("debug log 2 - signin.action.ts", session);
    session.setUser(
      signupResult?.data?.access_token,
      signupResult?.data?.refresh_token
    );
    console.log("debug log 3 - signin.action.ts", session.getUser());
    const result: ActionResultSuccess<User> = {
      success: true,
      origin: "email" as ORIGIN,
      message: "Signup successful",
      data: null,
    };
    return Response.json(result, {
      status: 200,
      headers: {
        "Set-Cookie": await session.commitSession(),
      },
    });
  }
}
