"use client"; // If you're using React Server Components, this component needs to be a Client Component

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Define a type for your user data
interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  // Add other relevant user properties
}

interface CreatorEditorProps {
  onSearch: (query: string) => Promise<User[]>;
  onConnectClick: (userId: string) => void;
}

export function CreatorEditor({
  onSearch,
  onConnectClick,
}: CreatorEditorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const results = await onSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
      toast.error("Error searching for users");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Optional: Trigger search on input change after a debounce delay
    // if you don't want a separate search button
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search for users..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {searchResults.length === 0 &&
            !isLoading &&
            searchQuery.length > 0 && (
              <p className="text-center">No users found.</p>
            )}
          {isLoading && <p className="text-center">Loading...</p>}
          {searchResults.length > 0 && (
            <ScrollArea className="h-48 pr-4">
              {" "}
              {/* Adjust height as needed */}
              <div className="space-y-4">
                {searchResults.map((user, index) => (
                  <div key={user.id}>
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.avatarUrl}
                            alt={`${user.name}'s avatar`}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium">{user.name}</p>
                      </div>
                      <Button size="sm" onClick={() => onConnectClick(user.id)}>
                        Connect
                      </Button>
                    </div>
                    {index < searchResults.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
