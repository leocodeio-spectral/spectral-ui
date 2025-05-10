import { signupPayloadSchema } from "~/services/schemas/signup.schema";
import { signinPayloadSchema } from "~/services/schemas/signin.schema";
import { SignupPayload, SigninPayload } from "~/types/user";

import { makeApiRequest } from "./common.server";
import { ActionResult } from "~/types/action-result";

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
) => {
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
  return await response.json();
  // If the execution reaches here, it means the signup was successful

  // create standard signin and return the response
  // const signinResult = await signin(signupPayload, request);
  // return signinResult;
};
// end ------------------------------ signup ----------------------------
// start ---------------------------- signin ----------------------------

export const signin = async (
  signinPayload: SigninPayload,
  request: Request
) => {
  const { role, email, password } = signinPayloadSchema.parse(signinPayload);

  const response = await makeApiRequest<
    any,
    { email: string; password: string }
  >(`${role}/${authEndpoints.signin}`, {
    method: "POST",
    request,
    body: {
      email,
      password,
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
      return Response.json(result, { status: 401 });
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
  return await response.json();
};
// end ------------------------------ signin ------------------------------
// start ------------------------------ logout ------------------------------
export const logout = async (role: string, request: Request) => {
  const response = await makeApiRequest(`${role}/${authEndpoints.logout}`, {
    method: "POST",
    request,
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
