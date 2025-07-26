"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/utils/jwt";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = getUserFromToken();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Redirect if no user/token
    }
  }, [user, router]);

  if (!user) return null; // Avoid flicker

  return children;
}
