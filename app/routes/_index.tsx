import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { Link } from "@remix-run/react";
import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectral-UI" },
    { name: "description", content: "Welcome to Spectral!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Header />
      {/* <Button variant="link" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <ModeToggle /> */}
      <h1 className="text-4xl font-bold">Welcome to Spectral</h1>
    </div>
  );
}

