import { ActionFunctionArgs } from "@remix-run/node";

export default function ConnectEditor() {
  return <div>ConnectEditor</div>;
}

export const loader = () => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const editorId = formData.get("editorId");
  console.log(editorId);
  return null;
};