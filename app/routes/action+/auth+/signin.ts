import { json, type ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    return json(
      { success: false, errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  console.log("signin", parsedData.data);
  return json({ success: true });
}
