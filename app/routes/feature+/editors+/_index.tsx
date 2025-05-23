import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";

// loader

import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
import { useLoaderData } from "@remix-run/react";
import CreatorEditor from "~/components/creator/routes/editors/creator-editor";
export const loader = dashboardLoader;

export const renderEditors = ({ role }: { role: Persona }) => {
  switch (role) {
    case Persona.CREATOR:
      return <CreatorEditor />;
    case Persona.EDITOR:
      return <div>Editor</div>;
    default:
      return <div>Admin</div>;
  }
};

export default function Editors() {
  const data = useLoaderData<typeof loader>() as { role: Persona };
  const { role } = data;
  return (
    <div className="h-fit w-full p-3">
      <CommonSubHeader userName="Harsha Leo" role="Admin" />
      {renderEditors({ role })}
    </div>
  );
}
