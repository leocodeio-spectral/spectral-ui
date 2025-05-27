import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";

// loader

import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
import { useLoaderData } from "@remix-run/react";
import { CreatorEditor } from "~/components/creator/routes/editors/creator-editor";
import EditorCreator from "~/components/editor/routes/editors/editor-creator";
export const loader = dashboardLoader;

export const renderEditors = ({ role }: { role: Persona }) => {
  switch (role) {
    case Persona.CREATOR:
      return (
        <CreatorEditor
          onSearch={() => Promise.resolve([])}
          onConnectClick={() => {}}
        />
      );
    case Persona.EDITOR:
      return <EditorCreator />;
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
