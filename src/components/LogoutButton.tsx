"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();  // Server Action signs out
    router.push("/login");  // Client redirect
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}