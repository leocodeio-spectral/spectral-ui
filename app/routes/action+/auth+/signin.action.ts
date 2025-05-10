import { type ActionFunctionArgs } from "@remix-run/node";
import { mailLogin, mailLoginVerify, signin } from "@/services/auth.server";
import {
  MailOtpLoginPayload,
  MailOtpLoginVerifyPayload,
  SendOTPPayload,
  SigninPayload,
  User,
  UserExistsPayload,
} from "@/types/user";
import {
  ActionResultError,
  ActionResultSuccess,
  ORIGIN,
} from "@/types/action-result";
import {
  mailOtpLoginPayloadSchema,
  mailOtpLoginVerifyPayloadSchema,
  signinPayloadSchema,
} from "@/services/schemas/signin.schema";
import { userSession } from "@/services/sessions.server";
import { sendOTPPayloadSchema } from "~/services/schemas/otp.schema";
import { userExistsPayloadSchema } from "~/services/schemas/user-exists.schema";
import { isUserExists, sendMailOtp } from "~/services/verfication.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("debug log 1 - signin.action.ts", data);

  const verificationStep = data.verificationStep;

  // is exists
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

  if (verificationStep === "password") {
    // Handle password-based login
    const signinPayload = {
      identifier: data.email,
      type: "email" as "email" | "mobile",
      password: data.password,
      role: data.role,
    } as SigninPayload;

    const parsedSigninPayload = signinPayloadSchema.safeParse(signinPayload);

    if (!parsedSigninPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedSigninPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedSigninPayload.error.issues[0].message,
        data: parsedSigninPayload.data,
      };
      return Response.json(result, { status: 400 });
    }

    const signinResult = await signin(parsedSigninPayload.data, request);

    if (!signinResult.success) {
      return Response.json(signinResult, { status: 400 });
    }

    const session = await userSession(request);
    session.setUser(
      signinResult?.data?.access_token,
      signinResult?.data?.refresh_token
    );

    const result: ActionResultSuccess<User> = {
      success: true,
      origin: "email" as ORIGIN,
      message: "Signin successful",
      data: signinResult.data,
    };

    return Response.json(result, {
      status: 200,
      headers: {
        "Set-Cookie": await session.commitSession(),
      },
    });
  } else if (verificationStep === "otp") {
    console.log("sending otp");
    console.log("data", data);
    const signinPayload = {
      email: data.email,
      name: data.email,
      role: data.role,
    } as MailOtpLoginPayload;

    const parsedSigninPayload =
      mailOtpLoginPayloadSchema.safeParse(signinPayload);
    console.log("parsedSigninPayload", parsedSigninPayload);
    if (!parsedSigninPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedSigninPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedSigninPayload.error.issues[0].message,
        data: parsedSigninPayload.data,
      };
      return Response.json(result, { status: 400 });
    }
    console.log("parsedSigninPayload", parsedSigninPayload);
    const mailLoginResult = await mailLogin(parsedSigninPayload.data, request);
    console.log("mailLoginResult", mailLoginResult);
    if (!mailLoginResult.success) {
      return Response.json(mailLoginResult, { status: 400 });
    }
    console.log("mailLoginResult", mailLoginResult);
    return Response.json(
      {
        success: true,
        origin: "email" as ORIGIN,
        message: "OTP sent",
        data: null,
      },
      { status: 200 }
    );
  } else if (verificationStep === "verify") {
    console.log("verifying otp");
    const verifyPayload = {
      email: data.email,
      otp: data.otp,
      role: data.role,
      name: data.email,
    } as MailOtpLoginVerifyPayload;
    console.log("verifyPayload", verifyPayload);
    const parsedVerifyPayload =
      mailOtpLoginVerifyPayloadSchema.safeParse(verifyPayload);
    console.log("parsedVerifyPayload", parsedVerifyPayload);
    if (!parsedVerifyPayload.success) {
      const result: ActionResultError<any> = {
        success: false,
        origin: parsedVerifyPayload.error.issues[0].path[0] as ORIGIN,
        message: parsedVerifyPayload.error.issues[0].message,
        data: parsedVerifyPayload.data,
      };
      return Response.json(result, { status: 400 });
    }
    console.log("parsedVerifyPayload", parsedVerifyPayload);
    const mailLoginVerifyResult = await mailLoginVerify(
      parsedVerifyPayload.data,
      request
    );
    console.log("mailLoginVerifyResult", mailLoginVerifyResult);
    const session = await userSession(request);
    session.setUser(
      mailLoginVerifyResult.data.access_token,
      mailLoginVerifyResult.data.refresh_token
    );
    console.log("session", session);
    const result: ActionResultSuccess<User> = {
      success: true,
      origin: "email" as ORIGIN,
      message: "Signin successful",
      data: mailLoginVerifyResult.data,
    };
    console.log("result", result);
    return Response.json(result, {
      status: 200,
      headers: {
        "Set-Cookie": await session.commitSession(),
      },
    });
  }

  // Handle invalid verification step
  return Response.json(
    {
      success: false,
      origin: "email" as ORIGIN,
      message: "Invalid verification step",
      data: null,
    },
    { status: 400 }
  );
}
