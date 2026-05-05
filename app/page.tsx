import { redirect } from "next/navigation";

import { Chat } from "@/components";
import { verifySessionFromCookies } from "@/lib/auth/session";

export default async function Home() {
  const session = await verifySessionFromCookies();
  if (!session) {
    redirect("/login");
  }

  return (
    <Chat />
  );
}
