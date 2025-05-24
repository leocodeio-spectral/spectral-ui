/*
 * fetch already linked accounts
 * show them in a grid pattren that would be responsive
 * in each card, show a button to unlink the account
 * button to link new account
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Account {
  id: string;
  name: string;
  platform: string;
}

export interface CreatorAccountsProps {
  accounts: Account[];
  onUnlink: (accountId: string) => void;
  onLinkNew: () => void;
}

export default function CreatorAccounts({
  accounts,
  onUnlink,
  onLinkNew,
}: CreatorAccountsProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Linked Accounts</h2>
      <Card className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-medium">{account.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {account.platform}
                </p>
              </div>
              <Button
                variant="destructive"
                className="mt-4"
                onClick={() => onUnlink(account.id)}
              >
                Unlink
              </Button>
            </CardContent>
          </Card>
        ))}
      </Card>
      {/* Add a new account card */}
      <div className="mt-6 flex justify-center">
        <Card className="w-full max-w-md text-center p-6 shadow-lg border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center gap-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Add a new platform or service
            </p>
            <Button variant="outline" onClick={onLinkNew}>
              Link New Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
