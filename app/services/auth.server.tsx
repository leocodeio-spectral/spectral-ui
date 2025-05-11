import { signupPayloadSchema } from "~/services/schemas/signup.schema";
import {
  mailOtpLoginPayloadSchema,
  mailOtpLoginVerifyPayloadSchema,
  signinPayloadSchema,
} from "~/services/schemas/signin.schema";
import {
  SignupPayload,
  SigninPayload,
  MailOtpLoginPayload,
  MailOtpLoginVerifyPayload,
} from "~/types/user";

import { makeApiRequest } from "./common.server";
import { ActionResult, ActionResultError, ORIGIN } from "~/types/action-result";
import { userSession } from "./sessions.server";

const authEndpoints = {
  // common
  isExists: "/is-user-exists",
  update: "/update/{id}",
  logout: "/logout",
  me: "/me",
  // register
  signup: "/register",
  verifyEmail: "/otp/verify-mail",
  // login
  signin: "/login",
  mailLogin: "/mail/login",
  mailLoginVerify: "/mail/login/verify",
};

// start ------------------------------ signup ------------------------------
export const signup = async (
  signupPayload: SignupPayload,
  request: Request
): Promise<ActionResult<any>> => {
  const { role, name, confirmPassword, ...rest } =
    signupPayloadSchema.parse(signupPayload);

  const response = await makeApiRequest<
    any,
    { email: string; password: string }
  >(`/${role}${authEndpoints.signup}`, {
    method: "POST",
    request,
    body: rest,
  });

  console.log("response of signup", response);

  if (!response.ok) {
    console.log("response", response);
    // 409
    if (response.status === 409) {
      const result: ActionResult<SignupPayload> = {
        success: false,
        origin: "email",
        message: "User already exists",
        data: null,
      };
      return result;
    }
    // 500
    else if (response.status === 500) {
      const result: ActionResult<SignupPayload> = {
        success: false,
        origin: "email",
        message: "Failed to signup due to backend server error",
        data: null,
      };
      return result;
    }
    // 401
    else if (response.status === 401 || response.status === 403) {
      const result: ActionResult<SignupPayload> = {
        success: false,
        origin: "email",
        message: "Failed to signup due to invalid authorization",
        data: null,
      };
      return result;
    }
    // 400
    else if (response.status === 400) {
      const result: ActionResult<SignupPayload> = {
        success: false,
        origin: "email",
        message: "Failed to signup due to invalid authorization",
        data: null,
      };
      return result;
    }
  }

  // [TODO-1] parse and return data in action result format
  // return await response.json();
  // If the execution reaches here, it means the signup was successful

  // create standard signin and return the response
  console.log("SIGNUP sucess");
  const signinPayload = {
    identifier: signupPayload.email,
    type: "email" as "email" | "mobile",
    password: signupPayload.password,
    role: signupPayload.role,
  } as SigninPayload;
  console.log("signinPayload", signinPayload);
  const parsedSigninPayload = signinPayloadSchema.safeParse(signinPayload);

  if (!parsedSigninPayload.success) {
    const result: ActionResultError<any> = {
      success: false,
      origin: parsedSigninPayload.error.issues[0].path[0] as ORIGIN,
      message: parsedSigninPayload.error.issues[0].message,
      data: parsedSigninPayload.data,
    };
    return result;
  }

  const signinResult = await signin(parsedSigninPayload.data, request);

  console.log("signinResult", signinResult);
  return signinResult.data;
};
// end ------------------------------ signup ----------------------------
// start ---------------------------- signin ----------------------------
export const signin = async (
  signinPayload: SigninPayload,
  request: Request
): Promise<ActionResult<any>> => {
  const { role, identifier, password } =
    signinPayloadSchema.parse(signinPayload);

  const response = await makeApiRequest<
    any,
    { identifier: string; password: string; channel: string }
  >(`/${role}${authEndpoints.signin}`, {
    method: "POST",
    request,
    body: {
      identifier,
      password,
      channel: "web",
    },
  });

  if (!response.ok) {
    // 404
    if (response.status === 404) {
      // user with email not found
      const result: ActionResult<SigninPayload> = {
        success: false,
        origin: "email",
        message: "User not found",
        data: signinPayload,
      };
      return result;
    }
    // 401
    else if (response.status === 401) {
      const result: ActionResult<SigninPayload> = {
        success: false,
        origin: "password",
        message: "Invalid password",
        data: signinPayload,
      };
      return result;
    }
    // 409
    else if (response.status === 409) {
      const result: ActionResult<SigninPayload> = {
        success: false,
        origin: "email",
        message: "User not found",
        data: signinPayload,
      };
      return result;
    } else {
      const result: ActionResult<SigninPayload> = {
        success: false,
        origin: "email",
        message: "Failed to signin",
        data: signinPayload,
      };
      return result;
    }
  }

  // [TODO-2] parse and return data in action result format
  // return await response.json();
  const result: ActionResult<SigninPayload> = {
    success: true,
    origin: "email",
    message: "Signin successful",
    data: await response.json(),
  };
  return result;
};
// end ------------------------------ signin ------------------------------
// start ------------------------------ logout ------------------------------
export const logout = async (role: string, request: Request) => {
  const session = await userSession(request);
  const { accessToken } = session.getUser();
  const response = await makeApiRequest(`/${role}${authEndpoints.logout}`, {
    method: "POST",
    request,
    body: {
      accessToken,
    },
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Failed to logout",
    };
  }

  return {
    success: true,
    message: "Logged out successfully",
  };
};
// end ------------------------------ logout ------------------------------
// start ------------------------------ mail login ------------------------------
export const mailLogin = async (
  mailLoginPayload: MailOtpLoginPayload,
  request: Request
): Promise<ActionResult<any>> => {
  const { role, email, name } =
    mailOtpLoginPayloadSchema.parse(mailLoginPayload);
  const response = await makeApiRequest(`/${role}${authEndpoints.mailLogin}`, {
    method: "POST",
    request,
    body: {
      mail: email,
      name,
      channel: "mobile",
      userAgent: request.headers.get("User-Agent"),
    },
  });

  if (!response.ok) {
    return {
      success: false,
      origin: "email",
      message: "Failed to send mail otp",
      data: null,
    };
  }

  return {
    success: true,
    origin: "email",
    message: "Mail otp sent successfully",
    data: null,
  };
};
// end ------------------------------ mail login ------------------------------
// start ------------------------------ mail login verify ------------------------------
export const mailLoginVerify = async (
  mailLoginVerifyPayload: MailOtpLoginVerifyPayload,
  request: Request
): Promise<ActionResult<any>> => {
  const { role, email, name, otp } = mailOtpLoginVerifyPayloadSchema.parse(
    mailLoginVerifyPayload
  );

  const response = await makeApiRequest(
    `/${role}${authEndpoints.mailLoginVerify}`,
    {
      method: "POST",
      request,
      body: {
        mail: email,
        otp,
        name,
        channel: "mobile",
        userAgent: request.headers.get("User-Agent"),
      },
    }
  );

  if (!response.ok) {
    return {
      success: false,
      origin: "email",
      message: "Failed to verify mail otp",
      data: null,
    };
  }

  return {
    success: true,
    origin: "email",
    message: "Mail otp verified successfully",
    data: await response.json(),
  };
};
// end ------------------------------ mail login verify ------------------------------
// start ------------------------------ me ------------------------------
export const me = async (role: string, request: Request) => {
  const session = await userSession(request);
  const { accessToken } = session.getUser();
  const response = await makeApiRequest(`/${role}${authEndpoints.me}`, {
    method: "GET",
    access_token: accessToken,
    request,
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Failed to get user details",
    };
  }

  return {
    success: true,
    message: "User details fetched successfully",
    data: (await response.json()).data,
  };
};
// end ------------------------------ me ------------------------------
