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
import { UserInput } from "@/components/self/user-input";
import { useEffect, useState } from "react";
import { SignupPayload, User } from "@/types/user";
import { ActionResult } from "@/types/action-result";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { action as signupAction } from "@/routes/action+/auth+/signup.action";
import { loader as signupLoader } from "@/routes/loader+/auth+/signup";
import { PROFILE_PICTURES } from "~/models/profilePictures";

// toggle group
import { Loader2, Timer, UserCircle2Icon, UserRoundIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { OTPInput } from "@/components/auth/otp-input";

export const action = signupAction;
export const loader = signupLoader;

export default function Signup() {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedProfilePic, setSelectedProfilePic] = useState(
    PROFILE_PICTURES[0]
  );
  const [role, setRole] = useState("editor");
  const [otp, setOtp] = useState("");
  const [otpResendTime, setOtpResendTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const [verificationStep, setVerificationStep] = useState<"details" | "otp">(
    "details"
  );

  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  const navigate = useNavigate();
  const actionData = useActionData<ActionResult<User | SignupPayload>>();

  useEffect(() => {
    console.log("actionData", actionData);
    if (actionData?.success) {
      setLoading(false);
      if (actionData.origin === "email") {
        setVerificationStep("otp");
      } else {
        toast({
          title: "Sign Up",
          description: actionData.message,
          variant: "default",
        });
        navigate("/");
      }
    } else if (actionData?.success === false) {
      if (actionData.origin === "email") {
        setError({ type: "email", message: actionData.message });
      } else if (actionData.origin === "password") {
        setError({ type: "password", message: actionData.message });
      } else if (actionData.origin === "phone") {
        setError({ type: "phone", message: actionData.message });
      } else if (actionData.origin === "otp") {
        setError({ type: "otp", message: actionData.message });
      }
    }
  }, [actionData, navigate]);

  const validateMobile = (mobile: string) => {
    return /^[+]?[0-9]{10,12}$/.test(mobile);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            {verificationStep === "details"
              ? "Create your account to get started"
              : "Verify your email with OTP"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" onSubmit={() => setLoading(true)}>
            <div className="flex flex-col gap-6">
              {verificationStep === "details" ? (
                <>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    className="grid grid-cols-2 gap-2"
                    defaultValue={role}
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
                  {/* Profile Picture Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      Profile Picture
                    </label>
                    <div className="flex gap-4">
                      {PROFILE_PICTURES.map((pic, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer rounded-full border-2 ${
                            selectedProfilePic === pic
                              ? "border-primary"
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedProfilePic(pic)}
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={pic}
                              alt={`Profile ${index + 1}`}
                            />
                          </Avatar>
                        </div>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      name="profilePicUrl"
                      value={selectedProfilePic}
                    />
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <UserInput
                      id="firstName"
                      className="grid gap-2"
                      label="First Name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <UserInput
                      id="lastName"
                      className="grid gap-2"
                      label="Last Name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Field */}
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
                      required
                      error={error?.type === "email" ? error.message : ""}
                    />
                  </div>

                  {/* Mobile Field */}
                  <div className="grid gap-2">
                    <UserInput
                      id="mobile"
                      className="grid gap-2"
                      label="Mobile Number"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+919603028848"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (validateMobile(e.target.value)) {
                          setError(null);
                        } else {
                          setError({
                            type: "phone",
                            message: "Invalid mobile number",
                          });
                        }
                      }}
                      error={error?.type === "phone" ? error.message : ""}
                      required
                    />
                  </div>

                  {/* Password Fields */}
                  <div className="grid gap-2">
                    <UserInput
                      id="password"
                      className="grid gap-2"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <UserInput
                      id="confirmPassword"
                      className="grid gap-2"
                      label="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (password !== e.target.value) {
                          setError({
                            type: "password",
                            message: "Passwords do not match",
                          });
                        } else {
                          setError(null);
                        }
                      }}
                      error={error?.type === "password" ? error.message : ""}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      password !== confirmPassword ||
                      !email ||
                      !password ||
                      !confirmPassword ||
                      !firstName ||
                      !lastName ||
                      !mobile ||
                      !selectedProfilePic
                    }
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  {/* Email Field */}
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
                      Otp sent to email
                    </p>
                  </div>
                  <OTPInput
                    email={email}
                    otp={otp}
                    onOTPChange={setOtp}
                    error={error?.type === "otp" ? error.message : ""}
                  />
                  <div className="flex items-center gap-2">
                    <Timer />
                    <p>
                      Otp will be valid for 60 seconds, go back to details to
                      resend otp
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Verify & Sign Up
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

              <Button variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/auth/signin" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
            <input
              type="hidden"
              name="verificationStep"
              value={verificationStep}
            />
            <input type="hidden" name="email" value={email} />
            <input
              type="hidden"
              name="name"
              value={`${firstName} ${lastName}`}
            />
            <input type="hidden" name="phone" value={mobile} />
            <input
              type="hidden"
              name="profilePicUrl"
              value={selectedProfilePic}
            />
            <input type="hidden" name="password" value={password} />
            <input
              type="hidden"
              name="confirmPassword"
              value={confirmPassword}
            />
            <input type="hidden" name="firstName" value={firstName} />
            <input type="hidden" name="lastName" value={lastName} />
            <input type="hidden" name="mobile" value={mobile} />
            <input type="hidden" name="role" value={role} />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
