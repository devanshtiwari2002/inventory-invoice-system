"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/jwt";
import { logoutUser } from "@/utils/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = getUserFromToken();
    setRole(user?.role);
  }, []);

  // Hide sidebar on login page or if no token
  if (pathname === "/login" || !role) return null;

  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-2xl font-bold">Inventory</h2>
      <nav className="space-y-2">
        <NavItem href="/dashboard" label="Dashboard" pathname={pathname} />

        {(role === "admin" || role === "staff") && (
          <>
            <NavItem href="/products" label="Products" pathname={pathname} />
            <NavItem href="/sales" label="Sales" pathname={pathname} />
          </>
        )}

        {role === "admin" && (
          <NavItem href="/users" label="Users" pathname={pathname} />
        )}

        <NavItem href="/profile" label="Profile" pathname={pathname} />
        <NavItem onClick={logoutUser} label="Logout" isButton />
      </nav>
    </div>
  );
}


function NavItem({ href, label, pathname, onClick, isButton }) {
  const isActive = pathname === href;
  const classes = `px-3 py-2 rounded cursor-pointer ${
    isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-700"
  }`;

  if (isButton) {
    return (
      <div onClick={onClick} className={classes}>
        {label}
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className={classes}>{label}</div>
    </Link>
  );
}
