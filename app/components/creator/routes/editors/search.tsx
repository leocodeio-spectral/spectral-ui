import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { ActionResult } from "~/types/action-result";
import { useFetcher } from "@remix-run/react";

export interface Editor {
  creatorId: string;
  editorId: string;
  editorMail: string;
  editorName: string;
  editorAvatar: string;
  status: string;
}

interface EmailSearchProps {}

export function EmailSearch({}: EmailSearchProps) {
  const [email, setEmail] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);

  const searchFetcher = useFetcher();
  const connectFetcher = useFetcher();

  const isLoading = searchFetcher.state !== "idle";

  useEffect(() => {
    console.log("searchFetcher.data", searchFetcher.data);
    console.log("searchFetcher.state", searchFetcher.state);
    if (searchFetcher.state === "idle" && searchFetcher.data) {
      const response = searchFetcher.data as ActionResult<any>;
      if (response.success) {
        toast({
          title: "Found editor",
          description: response.message,
          variant: "default",
        });
        console.log("response.data", response.data.data);
        setEditor(response.data.data as Editor);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        setEditor(null);
      }
    }
  }, [searchFetcher.state, searchFetcher.data]);

  const handleSearch = () => {
    if (!email.trim() || !isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    searchFetcher.submit(
      { email },
      {
        method: "post",
        action: "/feature/editors/searchEditor",
      }
    );
  };

  useEffect(() => {
    console.log("connectFetcher.data", connectFetcher.data);
    console.log("connectFetcher.state", connectFetcher.state);
    if (connectFetcher.state === "idle" && connectFetcher.data) {
      const response = connectFetcher.data as ActionResult<any>;
      if (response.success) {
        toast({
          title: "Success",
          description: "Successfully connected with editor",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to connect with editor",
          variant: "destructive",
        });
      }
    }
  }, [connectFetcher.state, connectFetcher.data]);

  const handleEditorConnect = (editorId: string) => {
    connectFetcher.submit(
      { editorId },
      {
        method: "post",
        action: "/feature/editors/search",
      }
    );
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 my-2">
      <div className="flex items-center space-x-2">
        <Input
          type="email"
          placeholder="Enter editor's email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading || !isValidEmail(email)}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      {editor ? (
        <Card>
          <CardContent className="p-4">
            <ScrollArea className="h-fit">
              <div className="space-y-4">
                <div key={editor.editorId}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={editor.editorAvatar} />
                        <AvatarFallback>
                          {editor.editorName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{editor.editorName}</p>
                        <p className="text-sm text-gray-500">
                          {editor.editorMail}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        editor.status === "connected" ? "default" : "outline"
                      }
                      onClick={() => handleEditorConnect(editor.editorId)}
                      disabled={editor.status === "connected"}
                    >
                      {editor.status === "connected" ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-sm text-gray-500">
          Search to find editor
        </div>
      )}
    </div>
  );
}
