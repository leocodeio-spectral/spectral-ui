import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <Button>
          <Link to="/">Logout</Link>
        </Button>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
