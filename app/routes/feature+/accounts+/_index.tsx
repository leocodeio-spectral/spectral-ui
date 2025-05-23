import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";
import EditorAccounts from "~/components/editor/routes/accounts/editor-accounts";
import CreatorAccounts from "~/components/creator/routes/accounts/creator-accounts";

// loader

import { useLoaderData } from "@remix-run/react";
import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
export const loader = dashboardLoader;

export const renderAccounts = ({ role }: { role: Persona }) => {
  switch (role) {
    case Persona.CREATOR:
      return <CreatorAccounts />;
    case Persona.EDITOR:
      return <EditorAccounts />;
    default:
      return <div>Admin</div>;
  }
};

export default function Accounts() {
  const data = useLoaderData<typeof loader>() as { role: Persona };
  const { role } = data;
  return (
    <div className="h-fit w-full p-3">
      <CommonSubHeader userName="Harsha Leo" role="Admin" />
      {renderAccounts({ role })}
    </div>
  );
}
