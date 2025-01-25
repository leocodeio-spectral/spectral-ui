import { MetaFunction } from "@remix-run/node";
import { SignupForm } from "~/components/auth/signup-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectral Signup" },
    { name: "description", content: "Signup to Spectral" },
  ];
};

export default function Signup() {
  return <SignupForm />;
}
