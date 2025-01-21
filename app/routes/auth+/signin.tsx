import { MetaFunction } from "@remix-run/cloudflare";
import { LoginForm } from "~/components/auth/login-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectral SignIn" },
    { name: "description", content: "SignIn to Spectral" },
  ];
};

export default function Signin() {
  return <LoginForm />;
}
