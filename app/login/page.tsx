import { redirect } from "next/navigation";

import { LoginPageContent } from "@/components";
import { verifySessionFromCookies } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await verifySessionFromCookies();
  if (session) {
    redirect("/");
  }

  return <LoginPageContent />;
}
