import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectral-UI" },
    { name: "description", content: "Welcome to Spectral!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  );
}
