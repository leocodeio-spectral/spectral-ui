import { type ActionFunctionArgs } from "@remix-run/node";
import { signin } from "@/services/auth.server";
import { SendOTPPayload, SigninPayload, User } from "@/types/user";
import {
  ActionResultError,
  ActionResultSuccess,
  ORIGIN,
} from "@/types/action-result";
import { signinPayloadSchema } from "@/services/schemas/signin.schema";
import { userSession } from "@/services/sessions.server";
import { sendOTPPayloadSchema } from "~/services/schemas/otp.schema";
import { sendMailOtp } from "~/services/verfication.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("debug log 1 - signin.action.ts", data);

  const verificationStep = data.verificationStep;
  const loginMethod = data.loginMethod;

  if (verificationStep === "details") {
    // Handle password-based login
    if (loginMethod === "password") {
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
        signinResult.data.access_token,
        signinResult.data.refresh_token
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
    }
    // Handle OTP-based login initial step
    else if (loginMethod === "otp") {
      const otpPayload = {
        email: data.email,
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

      const sendMailOtpResult = await sendMailOtp(
        parsedOTPPayload.data,
        request
      );

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
    }
  }
  // Handle OTP verification step
  else if (verificationStep === "otp") {
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
      signinResult.data.access_token,
      signinResult.data.refresh_token
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
