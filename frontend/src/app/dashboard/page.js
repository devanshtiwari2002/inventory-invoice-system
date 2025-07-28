"use client";

import { getUserFromToken } from "@/utils/jwt";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProductList from "@/components/AdminProductList";

//admin dashboard components
import SalesSummary from "@/components/adminDashboard/SaleSummary";
import WeeklySalesChart from "@/components/adminDashboard/WeeklySalesChart";
import StaffPerformanceTable from "@/components/adminDashboard/StaffPerformanceTable";
import StockOverview from "@/components/adminDashboard/StockOverview";

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const user = getUserFromToken();
    setRole(user?.role);

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setDashboardData(data);
    };

    fetchData();
  }, []);

  if (!role || !dashboardData)
    return <div className="p-4 text-white">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-4 space-y-6 text-white">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>

        {role === "admin" && (
          <>
            <SalesSummary todaySales={dashboardData.todaySales} />
            <WeeklySalesChart weeklySales={dashboardData.weeklySales} />
            <StaffPerformanceTable staff={dashboardData.staffPerformance} />
            <StockOverview stock={dashboardData.stock} />

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
