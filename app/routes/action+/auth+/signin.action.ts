import { type ActionFunctionArgs } from "@remix-run/node";
import { signin } from "@/services/auth.server";
import { SigninPayload, User } from "@/types/user";
import { userSession } from "@/services/sessions.server";
import {
  ActionResultError,
  ActionResultSuccess,
  ORIGIN,
} from "@/types/action-result";
import { signinPayloadSchema } from "@/services/schemas/signin.schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const signinPayload = {
    email: data.email,
    password: data.password,
    role: data.role,
  } as SigninPayload;

  // parse with zod
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

  // signin
  const signinResult = await signin(parsedSigninPayload.data, request);

  const session = await userSession(request);
  console.log("debug log 2 - signin.action.ts", session);
  session.setUser(
    signinResult?.data?.access_token,
    signinResult?.data?.refresh_token
  );
  console.log("debug log 3 - signin.action.ts", session.getUser());
  const result: ActionResultSuccess<User> = {
    success: true,
    origin: "email",
    message: "Signin successful",
    data: null,
  };
  return Response.json(result, {
    status: 200,
    headers: {
      "Set-Cookie": await session.commitSession(),
    },
  });
}
