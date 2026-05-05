"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/Button";

function LoginLoadingScreen() {
  return (
    <main className="min-h-screen bg-rh-dark px-4 py-10 text-rh-white">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl items-center justify-center">
        <span className="h-10 w-10 rounded-full border-2 border-rh-lime border-t-transparent animate-spin" />
      </div>
    </main>
  );
}

function LoginFallbackError({
  message,
  onTryAgain,
}: {
  message: string;
  onTryAgain: () => void;
}) {
  return (
    <main className="min-h-screen bg-rh-dark px-4 py-10 text-rh-white">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-700/60 bg-rh-surface p-6 shadow-xl">
          <h1 className="text-2xl font-semibold text-rh-white">Session check failed</h1>
          <p className="mt-2 text-sm text-red-300">{message}</p>
          <Button type="button" variant="default" className="mt-4" onClick={onTryAgain}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}

export function LoginPageContent() {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const [dismissedError, setDismissedError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !user) return;
    router.replace("/");
    router.refresh();
  }, [isLoading, user, router]);

  if (isLoading) {
    return <LoginLoadingScreen />;
  }

  if (error && error !== dismissedError) {
    return <LoginFallbackError message={error} onTryAgain={() => setDismissedError(error)} />;
  }

  if (user) {
    return <LoginLoadingScreen />;
  }

  return <LoginForm />;
}
