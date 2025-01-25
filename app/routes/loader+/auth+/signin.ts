import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

export const ROUTE_PATH = "/auth/login" as const;

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { getSessionStorage } = context;
  const { env } = context.cloudflare;

  if (!getSessionStorage) {
    throw new Error("Session storage is not available");
  }

  // will make this call to the auth service
  // check if the user is logged in with the valid access token

  const user = true;
  if (!user) {
    return redirect(env?.SITEINFO?.user_not_logged_in_path || "/");
  }
  return {};
}
