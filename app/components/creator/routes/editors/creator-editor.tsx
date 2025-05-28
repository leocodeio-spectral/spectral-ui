import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "@remix-run/react";

// Define a type for your user data
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  // Add other relevant user properties
}

interface CreatorEditorProps {
  editors: User[];
  onUnlink: (accountId: string) => void;
}

export function CreatorEditor({ editors, onUnlink }: CreatorEditorProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-0 bg-transparent shadow-none">
        {editors?.map((editor) => (
          <Card key={editor.id}>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <p>{editor.email}</p>
              <Button className="mt-4" onClick={() => onUnlink(editor.id)}>
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
              <CardTitle>Link Editor</CardTitle>
              <CardDescription>
                Connect a new editor to contribute to your content
              </CardDescription>
            </div>
            <Button variant="default" className="mt-2">
              <Link to="/feature/editors/search">Link New Editor</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
