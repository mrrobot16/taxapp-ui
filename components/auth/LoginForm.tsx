"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { API_ROUTES } from "@/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getFirebaseAuth, googleAuthProvider } from "@/lib/firebase/client";

const EMAIL_LINK_STORAGE_KEY = "taxapp.emailLinkSignIn";
const EMAIL_LINK_UNAVAILABLE_ERROR_CODES = new Set([
  "auth/operation-not-allowed",
  "auth/unauthorized-continue-uri",
  "auth/invalid-continue-uri",
  "auth/missing-continue-uri",
]);

async function createServerSession(idToken: string): Promise<void> {
  const res = await fetch(API_ROUTES.authSession, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Could not create session.");
  }
}

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M21.805 10.023H12v3.955h5.618c-.242 1.272-.967 2.35-2.053 3.074v2.551h3.318c1.945-1.79 3.062-4.432 3.062-7.573 0-.67-.06-1.314-.14-1.997z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.78 0 5.113-.92 6.816-2.497l-3.318-2.551c-.922.618-2.102.983-3.498.983-2.688 0-4.964-1.815-5.779-4.255H2.797v2.674A10 10 0 0 0 12 22z"
        fill="#34A853"
      />
      <path
        d="M6.221 13.68A6 6 0 0 1 5.9 12c0-.585.102-1.151.321-1.68V7.646H2.797A10 10 0 0 0 2 12c0 1.61.383 3.131 1.076 4.354z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.065c1.514 0 2.874.52 3.943 1.542l2.958-2.959C17.109 2.976 14.777 2 12 2A10 10 0 0 0 2.797 7.646l3.424 2.674C7.036 7.88 9.312 6.065 12 6.065z"
        fill="#EA4335"
      />
    </svg>
  );
}

function getFirebaseErrorCode(error: unknown): string | null {
  if (!error || typeof error !== "object" || !("code" in error)) return null;
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : null;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const completeLogin = useCallback(async (idToken: string) => {
    await createServerSession(idToken);
    router.replace("/");
    router.refresh();
  }, [router]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const auth = getFirebaseAuth();
    if (!isSignInWithEmailLink(auth, currentUrl)) return;

    setIsLoading(true);
    setError(null);
    setNotice(null);

    const storedEmail = window.localStorage.getItem(EMAIL_LINK_STORAGE_KEY);
    if (!storedEmail) {
      setError("For security, re-enter your email and press Continue with email.");
      setIsLoading(false);
      return;
    }

    void signInWithEmailLink(auth, storedEmail, currentUrl)
      .then(async (credential) => {
        window.localStorage.removeItem(EMAIL_LINK_STORAGE_KEY);
        const idToken = await credential.user.getIdToken(true);
        await completeLogin(idToken);
      })
      .catch((authError) => {
        const message =
          authError instanceof Error ? authError.message : "Could not complete email sign in.";
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [completeLogin]);

  async function handleEmailContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const auth = getFirebaseAuth();
      const actionCodeSettings = {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, normalizedEmail, actionCodeSettings);
      window.localStorage.setItem(EMAIL_LINK_STORAGE_KEY, normalizedEmail);
      setNotice("We sent you a secure sign-in link. Check your inbox to continue.");
    } catch (authError) {
      const code = getFirebaseErrorCode(authError);
      if (code && EMAIL_LINK_UNAVAILABLE_ERROR_CODES.has(code)) {
        setError("Email-link sign in is unavailable right now. Please use Google to continue.");
      } else {
        const message = authError instanceof Error ? authError.message : "Authentication failed.";
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const auth = getFirebaseAuth();
      const credential = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await credential.user.getIdToken(true);
      await completeLogin(idToken);
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Google sign in failed.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-rh-dark px-4 py-10 text-rh-white">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl items-center justify-center">
        <section className="flex w-full max-w-xl flex-col items-center text-center">
          <Image
            src="/taxapp.png"
            alt="Tax App"
            width={240}
            height={68}
            className="h-12 w-auto object-contain"
            priority
          />
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-rh-white sm:text-5xl">
            Think tax smart, file faster.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-rh-cool-gray sm:text-base">
            Brainstorm tax scenarios in chat and move from insight to client-ready answers with
            Tax App.
          </p>

          <div className="mt-8 w-full max-w-md rounded-2xl border border-rh-border bg-rh-surface p-6 shadow-xl">
            <Button
              type="button"
              variant="outline"
              fullWidth
              disabled={isLoading}
              onClick={handleGoogleAuth}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="my-4 flex items-center gap-3 text-xs text-rh-cool-gray">
              <div className="h-px flex-1 bg-rh-border" />
              <span>or</span>
              <div className="h-px flex-1 bg-rh-border" />
            </div>

            <form onSubmit={handleEmailContinue} className="space-y-3">
              <Input
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
              {notice && <p className="text-sm text-rh-cool-gray">{notice}</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button
                type="submit"
                variant="default"
                fullWidth
                disabled={isLoading || !email.trim()}
              >
                {isLoading ? "Please wait..." : "Continue with Email"}
              </Button>
            </form>

            <p className="mt-4 text-xs leading-relaxed text-rh-cool-gray">
              By continuing, you acknowledge Tax App&apos;s{" "}
              <a
                className="text-rh-lime hover:underline"
                href="/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                Policy
              </a>{" "}
              and{" "}
              <a
                className="text-rh-lime hover:underline"
                href="/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy
              </a>
              , and agree to receive promotional emails and occasional notifications.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
