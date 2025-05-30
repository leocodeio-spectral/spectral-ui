import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "@/services/sessions.server";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<Response | null> {
  // If user is not authenticated, redirect to signin
  const session = await userSession(request);
  const isAuthenticated = await session.isAuthenticated();
  if (!isAuthenticated) {
    return redirect("/auth/signin");
  }
  return null;
}
