/*
 * fetch already linked accounts
 * show them in a grid pattren that would be responsive
 * in each card, show a button to unlink the account
 * button to link new account
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "@remix-run/react";
import { Label } from "@/components/ui/label";

export interface Account {
  id: string;
  email: string;
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
      {/* Back Button */}
      <h2 className="text-2xl font-semibold mb-4">Linked Accounts</h2>
      <Button variant="ghost" className="my-2">
        <Link to="/feature/dashboard" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          <Label className="text-base font-medium">Back</Label>
        </Link>
      </Button>


      <Card className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-0 bg-transparent shadow-none">
        {accounts?.map((account) => (
          <Card key={account.id}>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <p>{account.email}</p>
              <Button className="mt-4" onClick={() => onUnlink(account.id)}>
                Unlink
              </Button>
            </CardContent>
          </Card>
        ))}
      </Card>
      {/* Add a new account card */}
      <div className="mt-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-2 text-center">
              <CardTitle>Link Account</CardTitle>
              <CardDescription>
                Connect a new account to enhance your experience
              </CardDescription>
            </div>
            <Button variant="default" onClick={onLinkNew} className="mt-2">
              Link New Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
