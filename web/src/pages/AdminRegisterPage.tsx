import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/auth-context";
import { getErrorMessage } from "../lib/error";

export const AdminRegisterPage = () => {
  const { registerAdmin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await registerAdmin({ name, email, password, adminKey });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 py-8 text-white">
      <Card className="w-full max-w-md border-white/10 bg-white/5 shadow-2xl backdrop-blur">
        <CardHeader>
          <CardTitle>Create admin account</CardTitle>
          <CardDescription className="text-slate-300">Use the backend admin key to create a privileged account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-slate-200">Full name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminKey" className="text-slate-200">Admin key</Label>
              <Input id="adminKey" type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creating..." : "Create admin account"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-slate-300">
            Need a normal account? <Link to="/register" className="text-white underline">Register here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};