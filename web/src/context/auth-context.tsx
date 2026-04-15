import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { authApi } from "../api/auth";
import { clearToken, getToken, setToken } from "../api/token";
import type { AuthPayload, User } from "../types";
type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { name: string; email: string; password: string; role?: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const applyAuth = (payload: AuthPayload, setUser: (user: User) => void, setTokenState: (token: string) => void) => {
  setUser(payload.user);
  setToken(payload.accessToken);
  setTokenState(payload.accessToken);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(getToken());
  const [loading, setLoading] = useState(true);

  const hydrateProfile = useCallback(async () => {
    const currentToken = getToken();

    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const profile = await authApi.profile();
      setUser(profile);
      setTokenState(currentToken);
    } catch {
      clearToken();
      setUser(null);
      setTokenState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void hydrateProfile();
  }, [hydrateProfile]);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const payload = await authApi.login(input);
    applyAuth(payload, setUser, setTokenState);
    toast.success("Logged in successfully");
  }, []);

  const register = useCallback(async (input: { name: string; email: string; password: string; role?: string }) => {
    const payload = await authApi.register(input);
    applyAuth(payload, setUser, setTokenState);
    toast.success("Account created successfully");
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
    toast.message("Logged out");
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      return;
    }

    const profile = await authApi.profile();
    setUser(profile);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
