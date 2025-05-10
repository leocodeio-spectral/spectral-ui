import { userSession } from "@/services/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { logout } from "@/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await userSession(request);
  const role = session.getRole();
  if (!role) {
    return redirect("/");
  }
  await logout(role, request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await session.removeUser(),
    },
  });
}
