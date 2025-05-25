import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";
import EditorAccounts from "~/components/editor/routes/accounts/editor-accounts";
import CreatorAccounts, {
  Account,
} from "~/components/creator/routes/accounts/creator-accounts";

// loader

import { useLoaderData, useSubmit } from "@remix-run/react";
import { loader as accountsLoader } from "~/routes/loader+/feature+/accounts+/accounts.loader";
export const loader = accountsLoader;

export const renderAccounts = ({ role }: { role: Persona }) => {
  const data = useLoaderData<typeof loader>();

  switch (role) {
    case Persona.CREATOR:
      const { linkedAccounts } = data;
      const submit = useSubmit();
      const onUnlink = (accountId: string) => {
        submit(
          { accountId },
          { method: "post", action: "/feature/accounts/unlink" }
        );
      };
      const onLinkNew = () => {
        submit({}, { method: "post", action: "/feature/accounts/getUrlLink" });
      };
      return (
        <CreatorAccounts
          accounts={linkedAccounts}
          onUnlink={onUnlink}
          onLinkNew={onLinkNew}
        />
      );
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
