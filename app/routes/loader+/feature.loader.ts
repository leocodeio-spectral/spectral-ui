import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "@/services/sessions.server";
import { Persona } from "~/models/persona";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<Response | { role: Persona }> {
  // If user is not authenticated, redirect to signin
  const session = await userSession(request);
  const isAuthenticated = await session.isAuthenticated();
  if (!isAuthenticated) {
    return redirect("/auth/signin");
  }

  const role = session.getRole();

  return { role };
}
