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
import { UserCircle2Icon, UserRoundIcon, Loader2, Timer } from "lucide-react";
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
  const [role, setRole] = useState("creator");
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("password");
  const [verificationStep, setVerificationStep] = useState<"details" | "otp">(
    "details"
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  // action
  const navigate = useNavigate();
  const actionData = useActionData<ActionResult<User | SigninPayload>>();

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.origin === "email" && actionData.message === "OTP sent") {
        setVerificationStep("otp");
      } else {
        toast({
          title: "Signin",
          description: actionData.message,
          variant: "default",
        });
        navigate("/");
      }
    } else if (actionData?.success === false) {
      // origin email
      if (actionData.origin === "email") {
        setError({ type: "email", message: actionData.message });
      } else if (actionData.origin === "password") {
        setError({ type: "password", message: actionData.message });
      } else if (actionData.origin === "otp") {
        setError({ type: "otp", message: actionData.message });
      } else {
        toast({
          title: "Signin Failed",
          description: actionData.message,
        });
      }
    }
  }, [actionData, navigate]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {verificationStep === "details"
              ? "Enter your email below to login to your account"
              : "Verify your email with OTP"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" onSubmit={() => setIsLoading(true)}>
            <div className="flex flex-col gap-6">
              {verificationStep === "details" ? (
                <>
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

                  <div className="grid gap-2">
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
                    </div>
                  ) : null}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  {/* OTP Verification Step */}
                  <div className="grid gap-2">
                    <UserInput
                      id="email"
                      className="grid gap-2"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      placeholder="m@example.com"
                      value={email}
                      disabled={true}
                    />
                    <p className="text-sm text-muted-foreground text-red-300">
                      OTP sent to email
                    </p>
                  </div>

                  <OTPInput
                    otp={otp}
                    onOTPChange={setOtp}
                    error={error?.type === "otp" ? error.message : ""}
                  />

                  <div className="flex items-center gap-2">
                    <Timer />
                    <p>
                      OTP will be valid for 60 seconds, go back to details to
                      resend OTP
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Verify & Sign In
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setVerificationStep("details")}
                  >
                    Back to Details
                  </Button>
                </>
              )}

              {verificationStep === "details" && (
                <Button variant="outline" className="w-full">
                  <Link to="/">Back to Home</Link>
                </Button>
              )}
            </div>

            {/* Hidden form fields */}
            <input type="hidden" name="role" value={role || "editor"} />
            <input type="hidden" name="loginMethod" value={loginMethod} />
            <input
              type="hidden"
              name="verificationStep"
              value={verificationStep}
            />
            <input type="hidden" name="email" value={email} />
            {loginMethod === "password" && (
              <input type="hidden" name="password" value={password} />
            )}

            {/* toggle signup link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
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
