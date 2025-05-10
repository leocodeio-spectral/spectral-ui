import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInput } from "@/components/self/user-input";
import { toast } from "@/hooks/use-toast";

interface OTPInputProps {
  otp: string;
  email: string;
  onOTPChange: (otp: string) => void;
  error?: string;
  onRequestOTP?: () => Promise<void>;
  className?: string;
}

export function OTPInput({
  otp,
  email,
  onOTPChange,
  error,
  onRequestOTP,
  className,
}: OTPInputProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestOTP = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRequesting(true);
      if (onRequestOTP) {
        await onRequestOTP();
      }
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

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
