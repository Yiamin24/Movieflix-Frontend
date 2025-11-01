import React, { useState } from "react";
import {
  loginUser,
  signupUser,
  verifyUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../api/LoginPageApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup States
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Forgot Password States
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* -------------------------------------------------------------------------- */
  /* ✅ LOGIN HANDLER                                                           */
  /* -------------------------------------------------------------------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(loginEmail, loginPassword);
      toast({
        title: "Login Successful 🎉",
        description: "Redirecting to dashboard...",
      });
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (err: any) {
      toast({
        title: "Login Failed ❌",
        description: err.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* ✅ SIGNUP HANDLER                                                          */
  /* -------------------------------------------------------------------------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(signupName, signupEmail, signupPassword);
      toast({
        title: "Account Created ✅",
        description: "Check your email for verification before login.",
      });
      setTab("login");
    } catch (err: any) {
      toast({
        title: "Signup Failed ❌",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* ✅ FORGOT PASSWORD HANDLERS                                                */
  /* -------------------------------------------------------------------------- */
  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(forgotEmail);
      setOtpSent(true);
      toast({
        title: "OTP Sent ✅",
        description: "Check your email for the verification code.",
      });
    } catch (err: any) {
      toast({
        title: "Error Sending OTP ❌",
        description: err.message || "Failed to send OTP. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp(forgotEmail, otp);
      setOtpVerified(true);
      toast({
        title: "OTP Verified ✅",
        description: "You can now reset your password.",
      });
    } catch (err: any) {
      toast({
        title: "Invalid OTP ❌",
        description: err.message || "OTP expired or incorrect.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch ⚠️",
        description: "New and confirm passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await resetPassword(forgotEmail, newPassword);
      toast({
        title: "Password Reset Successful ✅",
        description: "You can now login with your new password.",
      });
      // Reset all fields
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpSent(false);
      setOtpVerified(false);
      setTab("login");
    } catch (err: any) {
      toast({
        title: "Password Reset Failed ❌",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* ✅ UI RETURN                                                               */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-primary">Welcome</h1>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="forgot">Forgot</TabsTrigger>
          </TabsList>

          {/* ---------------------------- LOGIN TAB ---------------------------- */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          {/* ---------------------------- SIGNUP TAB --------------------------- */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>

          {/* ------------------------ FORGOT PASSWORD TAB ---------------------- */}
          <TabsContent value="forgot">
            {!otpSent ? (
              // STEP 1 - SEND OTP
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your registered email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            ) : !otpVerified ? (
              // STEP 2 - VERIFY OTP
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <Label>OTP</Label>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            ) : (
              // STEP 3 - RESET PASSWORD
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
