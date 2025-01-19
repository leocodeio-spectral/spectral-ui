import { MetaFunction } from "@remix-run/cloudflare";
import { SignupForm } from "~/components/signup-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectral Login" },
    { name: "description", content: "Login to Spectral" },
  ];
};

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
