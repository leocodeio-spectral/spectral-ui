import { type LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "../../../../services/sessions.server";
import { throw404Error } from "../../../../services/error-validations.server";
import { Persona } from "../../../../models/persona";

export const ROUTE_PATH = "/feature/dashboard" as const;

const getRoleBasedData = async (request: Request) => {
  const session = await userSession(request);
  const role = session.getRole();

  switch (role) {
    case Persona.CREATOR:
      return {
        role,
      };
    case Persona.EDITOR:
      return {
        role,
      };
    default:
      return {
        role,
      };
  }
};

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  // If user is already authenticated, redirect to dashboard
  //   const session = await userSession(request);
  //   const isAuthenticated = await session.isAuthenticated();
  //   console.log("validity at landing.loader.ts", isAuthenticated);
  //   if (isAuthenticated) {
  //     return redirect("/home");
  //   }
  // console.log("dashboard.loader.ts");
  const session = await userSession(request);

  if (!session.canAccess(ROUTE_PATH)) {
    await throw404Error(request);
  }

  const data = await getRoleBasedData(request);
  console.log("roleData", data);
  return data;
}
