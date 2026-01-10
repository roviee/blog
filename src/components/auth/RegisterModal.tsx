import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal = ({
  open,
  onOpenChange,
  onSwitchToLogin,
}: RegisterModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await signUp(email, password, fullName);
      onOpenChange(false);
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-amber-800 text-white hover:bg-amber-700"
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogDescription />
        <DialogHeader>
          <DialogTitle className="text-2xl">Create your account</DialogTitle>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </DialogHeader>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-name">Full Name</Label>
            <Input
              id="register-name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-confirm-password">Confirm Password</Label>
            <Input
              id="register-confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded" required />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-700"
            >
              Sign Up
            </Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={onSwitchToLogin}
                className="text-amber-800 cursor-pointer hover:underline font-medium"
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
