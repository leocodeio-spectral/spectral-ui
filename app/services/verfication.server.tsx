import { makeApiRequest } from "./common.server";
import { SendOTPPayload, UserExistsPayload } from "~/types/user";
import { ActionResult, ORIGIN } from "~/types/action-result";
const authEndpoints = {
  // common
  isExists: "/is-user-exists",
  verfiyMail: "/otp/verify-mail",
};

// start ------------------------------ isUserExists ------------------------------
export const isUserExists = async (
  userExistsPayload: UserExistsPayload,
  request: Request
): Promise<ActionResult<UserExistsPayload>> => {
  const response = await makeApiRequest(
    `/${userExistsPayload.role}${authEndpoints.isExists}`,
    {
      method: "POST",
      request,
      body: {
        identifier: userExistsPayload.identifier,
        type: userExistsPayload.type,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return {
        success: false,
        origin: userExistsPayload.type as ORIGIN,
        message: "User not found",
        data: null,
      };
    } else {
      return {
        success: false,
        origin: userExistsPayload.type as ORIGIN,
        message: "User not found",
        data: null,
      };
    }
  }

  // return await response.json();
  const data = await response.json();
  return {
    success: true,
    origin: userExistsPayload.type as ORIGIN,
    message: "User exists",
    data: data,
  };
};
// end ------------------------------ isUserExists ----------------------------
// start ---------------------------- sendMailOtp ----------------------------
export const sendMailOtp = async (
  sendMailPayload: SendOTPPayload,
  request: Request
): Promise<ActionResult<SendOTPPayload>> => {
  const response = await makeApiRequest(
    `/${sendMailPayload.role}${authEndpoints.verfiyMail}`,
    {
      method: "POST",
      request,
      body: {
        email: sendMailPayload.email,
        name: sendMailPayload.name,
      },
    }
  );
  if (!response.ok) {
    return {
      success: false,
      origin: "email",
      message: "Failed to send mail",
      data: null,
    };
  }

  // return await response.json();
  const data = await response.json();
  const result: ActionResult<SendOTPPayload> = {
    success: true,
    origin: "email" as ORIGIN,
    message: "Mail sent successfully",
    data: data,
  };
  return result;
};
// end ---------------------------- sendMailOtp ----------------------------
