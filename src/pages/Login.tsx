import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Shield, Eye, EyeOff, LogIn } from "lucide-react";
import AbodeLogo from "@/components/AbodeLogo";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const MOCK_USERS = [
  { username: "student1", password: "student123", role: "student" as const },
  { username: "student2", password: "student123", role: "student" as const },
  { username: "warden1", password: "warden123", role: "warden" as const },
];

const Login = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setRole(user.role);
        navigate(user.role === "student" ? "/student" : "/warden");
        toast({ title: "Welcome!", description: `Logged in as ${user.role}` });
      } else {
        toast({ title: "Login failed", description: "Invalid username or password", variant: "destructive" });
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <AbodeLogo size={48} />
        </div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-1 text-center">Welcome to Abode</h1>
        <p className="text-muted-foreground mb-8 text-center">Where living finds its home.</p>

        <Card className="border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your hostel credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="e.g. student1 or warden1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground flex items-center gap-1.5"><GraduationCap size={14} /> Student: student1 / student123</p>
              <p className="font-medium text-foreground flex items-center gap-1.5"><Shield size={14} /> Warden: warden1 / warden123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
