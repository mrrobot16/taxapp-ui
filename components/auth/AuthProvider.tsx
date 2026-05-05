"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { API_ROUTES } from "@/config";
import type { AuthUser } from "@/types";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<AuthUser | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type MeApiResponse = {
  authenticated?: boolean;
  user?: AuthUser;
};

async function fetchAuthenticatedUser(): Promise<AuthUser | null> {
  const res = await fetch(API_ROUTES.authMe, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (res.status === 401) return null;
  if (!res.ok) {
    throw new Error("Could not verify your session.");
  }

  const data = (await res.json()) as MeApiResponse;
  if (!data.authenticated || !data.user) return null;
  return data.user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await fetchAuthenticatedUser();
      setUser(currentUser);
      return currentUser;
    } catch (refreshError) {
      const message =
        refreshError instanceof Error ? refreshError.message : "Could not verify your session.";
      setUser(null);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await fetch(API_ROUTES.authLogout, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setError(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    void fetchAuthenticatedUser()
      .then((currentUser) => {
        if (!isMounted) return;
        setUser(currentUser);
        setError(null);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        if (!isMounted) return;
        const message =
          fetchError instanceof Error ? fetchError.message : "Could not verify your session.";
        setUser(null);
        setError(message);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      error,
      refreshUser,
      signOut,
    }),
    [user, isLoading, error, refreshUser, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
