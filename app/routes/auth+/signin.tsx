import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { UserInput } from "@/components/self/user-input";
import { SigninPayload, User } from "@/types/user";
import { ActionResult } from "@/types/action-result";
import { toast } from "@/hooks/use-toast";

// toggle group
import { UserCircle2Icon, UserRoundIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { KeyIcon, SmartphoneIcon } from "lucide-react";
import { OTPInput } from "@/components/auth/otp-input";

import { loader as signinLoader } from "@/routes/loader+/auth+/signin";
import { action as signinAction } from "@/routes/action+/auth+/signin.action";

export const loader = signinLoader;
export const action = signinAction;

export default function Signin() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("password");

  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  // action
  const navigate = useNavigate();
  const actionData = useActionData<ActionResult<User | SigninPayload>>();

  useEffect(() => {
    if (actionData?.success) {
      toast({
        title: "Signin",
        description: actionData.message,
        variant: "default",
      });
      navigate("/");
    } else if (actionData?.success === false) {
      // origin email
      if (actionData.origin === "email") {
        setError({ type: "email", message: actionData.message });
      } else if (actionData.origin === "password") {
        setError({ type: "password", message: actionData.message });
      } else {
        toast({
          title: "Signin Failed",
          description: actionData.message,
        });
      }
    }
  }, [actionData, navigate]);

  const handleRequestOTP = async () => {
    // TODO: Implement OTP request logic
    // This should be implemented in your action file
    const response = await fetch("/auth/request-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="flex flex-col gap-6">
              {/* role toggle group */}
              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={role}
                className="grid grid-cols-2 gap-2"
                onValueChange={(value: string) => {
                  if (value) {
                    setRole(value);
                  }
                }}
              >
                <ToggleGroupItem
                  value="creator"
                  aria-label="Toggle creator"
                  name="role"
                >
                  <UserCircle2Icon className="h-4 w-4" /> creator
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="editor"
                  aria-label="Toggle editor"
                  name="role"
                >
                  <UserRoundIcon className="h-4 w-4" /> editor
                </ToggleGroupItem>
              </ToggleGroup>
              <input type="hidden" name="role" value={role || "editor"} />

              {/* Login method toggle */}
              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={loginMethod}
                className="grid grid-cols-2 gap-2"
                onValueChange={(value: string) => {
                  if (value) {
                    setLoginMethod(value);
                  }
                }}
              >
                <ToggleGroupItem
                  value="password"
                  aria-label="Toggle password login"
                  name="loginMethod"
                >
                  <KeyIcon className="h-4 w-4" /> Password
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="otp"
                  aria-label="Toggle OTP login"
                  name="loginMethod"
                >
                  <SmartphoneIcon className="h-4 w-4" /> OTP
                </ToggleGroupItem>
              </ToggleGroup>
              <input type="hidden" name="loginMethod" value={loginMethod} />

              <div className="grid gap-2">
                {/* email input */}
                <UserInput
                  id="email"
                  className="grid gap-2"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error?.type === "email" ? error.message : ""}
                  required
                />
              </div>

              {/* Conditional rendering of password or OTP input */}
              {loginMethod === "password" ? (
                <div className="grid gap-2">
                  <UserInput
                    id="password"
                    className="grid gap-2"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error?.type === "password" ? error.message : ""}
                    required
                  />
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              ) : (
                <OTPInput
                  email={email}
                  otp={otp}
                  onOTPChange={setOtp}
                  error={error?.type === "otp" ? error.message : ""}
                  onRequestOTP={handleRequestOTP}
                />
              )}

              {/* login button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* back to home button */}
              <Button variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            {/* toggle signup link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
