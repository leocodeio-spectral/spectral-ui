import { redirect } from "@remix-run/node";
import { linkAccount } from "~/services/creator/accounts.server";
import { userSession } from "~/services/sessions.server";

export const loader = async ({ request }: { request: Request }) => {
  // console.log("callback request", request);

  // Get the URL from the request
  const url = new URL(request.url);

  // Get the 'code' query parameter
  const code = url.searchParams.get("code");
  // console.log("Extracted code:", code);

  // You can also extract other parameters if needed
  const scope = url.searchParams.get("scope");
  // console.log("Extracted scope:", scope);

  const session = await userSession(request);
  const creatorId = session.getCurrentUserId();
  const data = await linkAccount(request, {
    code: code!,
    creatorId: creatorId,
  });

  console.log("data", data);
  // console.log("creatorId", creatorId);
  return redirect("/feature/accounts");
};
