import { redirect } from "@remix-run/node";
import { getLinkAccountUrl } from "~/services/creator/accounts.servert";

export const action = async ({ request }: { request: Request }) => {
  const data = await getLinkAccountUrl(request);
  const url = data?.data;
  return redirect(url);
};
