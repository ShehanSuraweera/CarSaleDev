"use client";

import { useAuthListener } from "@/src/redux/hooks/useAuthListener";

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthListener(); // ✅ Runs the auth listener on the client side

  return <>{children}</>;
}
