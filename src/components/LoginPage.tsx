import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ImageWithFallback } from "./image/ImageWithFallback";
import { loginUser, signupUser, verifyUser } from "../api/LoginPageApi";
import { setAuthToken, clearAuthToken } from "../api/AuthToken"; 

interface LoginPageProps {
  onLogin: (email: string, name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      verifyUser(token)
        .then(() => {
          setVerifyMessage("🎉 Email verified successfully! You can now log in.");
          clearAuthToken();
          localStorage.clear();
        })
        .catch(() => {
          setVerifyMessage("⚠️ Verification link is invalid or has expired.");
        });
    }
  }, []);

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      clearAuthToken();
      const data = await loginUser(loginEmail, loginPassword);

      if (!data || !data.token) {
        alert("⚠️ Login failed. Please verify your email first.");
        return;
      }

      
      setAuthToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user.email, data.user.name || data.user.email.split("@")[0]);
    } catch (err: any) {
      alert(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(signupName, signupEmail, signupPassword);
      setVerifyMessage("✅ A verification link has been sent to your email. Please verify before logging in.");
      clearAuthToken();
      localStorage.clear();
    } catch (err: any) {
      alert(err.message || "Signup failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1548095115-45697e222a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-primary tracking-tight text-2xl font-bold">MOVIEFLIX</h1>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md mx-4 z-10 bg-black/80 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Sign in to manage your favorite movies and TV shows
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Verification Message */}
          {verifyMessage && (
            <div
              className={`mb-4 text-sm p-3 rounded-xl ${
                verifyMessage.startsWith("🎉")
                  ? "bg-green-500/20 text-green-300 border border-green-400"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-400"
              }`}
            >
              {verifyMessage}
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
