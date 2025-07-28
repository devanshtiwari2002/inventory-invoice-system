// /app/dashboard/layout.js
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getUserFromToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
