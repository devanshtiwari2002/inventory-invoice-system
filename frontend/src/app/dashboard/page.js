"use client";

import { getUserFromToken } from "@/utils/jwt";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProductList from "@/components/AdminProductList";

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = getUserFromToken();
    setRole(user?.role);
  }, []);

  if (!role) return <div className="p-4 text-white">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-4 space-y-4 text-white">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>

        {role === "admin" && (
          <>
            <div>
              <p className="font-semibold">Admin Summary:</p>
              <ul className="list-disc pl-6">
                <li>Total Sales</li>
                <li>Total Staff</li>
                <li>Total Products</li>
                <li>Weekly Earnings</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
              <AdminProductList />
            </div>
          </>
        )}

        {role === "staff" && (
          <div>
            <p className="font-semibold">Staff Summary:</p>
            <ul className="list-disc pl-6">
              <li>Create New Sale</li>
              <li>View Invoices</li>
              <li>Manage Products</li>
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
