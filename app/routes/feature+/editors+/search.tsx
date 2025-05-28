import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";

// loader

import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
import { useFetcher, useLoaderData } from "@remix-run/react";
import EditorCreator from "~/components/editor/routes/editors/editor-creator";
import {
  Editor,
  EmailSearch,
} from "~/components/creator/routes/editors/search";
import { ActionResult } from "~/types/action-result";
export const loader = dashboardLoader;

export const renderEditors = ({ role }: { role: Persona }) => {
  // Use a single fetcher instance for both operations
  const searchFetcher = useFetcher();
  const connectFetcher = useFetcher();

  switch (role) {
    case Persona.CREATOR:
      const onSearch = async (email: string) => {
        console.log("email", email);
        searchFetcher.submit(
          { email },
          {
            method: "post",
            action: "/feature/editors/searchEditor",
          }
        );
        return searchFetcher.data as ActionResult<any>;
      };

      const onEditorConnect = (editorId: string) => {
        connectFetcher.submit(
          { editorId },
          {
            method: "post",
            action: "/feature/editors/search",
          }
        );
      };

      return <EmailSearch />;

    case Persona.EDITOR:
      return <EditorCreator />;

    default:
      return <div>Admin</div>;
  }
};

export default function Search() {
  const data = useLoaderData<typeof loader>() as { role: Persona };
  const { role } = data;

  return (
    <div className="h-fit w-full p-3">
      <CommonSubHeader userName="Search Editor via Email" role="Creator" />
      {renderEditors({ role })}
    </div>
  );
}
