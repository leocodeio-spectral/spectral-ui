import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export const ROUTE_PATH = "/auth/signin" as const;

export async function loader({ request, context }: LoaderFunctionArgs) {
  // If user is already authenticated, redirect to dashboard
  if (context.auth?.isAuthenticated) {
    return redirect("/dashboard");
  }

  return null;
}
