import { redirect } from "@remix-run/node";
import { unlinkAccount } from "~/services/creator/accounts.server";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const accountId = formData.get("accountId");

  if (typeof accountId !== "string") {
    return redirect("/feature/accounts");
  }

  try {
    await unlinkAccount(request, accountId);
    return redirect("/feature/accounts");
  } catch (error) {
    return redirect("/feature/accounts");
  }
};
