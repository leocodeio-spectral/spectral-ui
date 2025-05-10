import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInput } from "@/components/self/user-input";
import { toast } from "@/hooks/use-toast";

interface OTPInputProps {
  otp: string;
  onOTPChange: (otp: string) => void;
  error?: string;
  className?: string;
}

export function OTPInput({
  otp,
  onOTPChange,
  error,
  className,
}: OTPInputProps) {
  return (
    <div className={className}>
      <div className="grid gap-2">
        <UserInput
          value={otp}
          id="otp"
          className="grid gap-2"
          label="OTP"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => onOTPChange(e.target.value)}
          error={error}
          required
        />
      </div>
    </div>
  );
}
