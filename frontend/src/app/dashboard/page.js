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
import BulkUploadForm from "@/components/BulkUploadForm";
import SalesList from "@/components/adminDashboard/Sales.List";
// import used in side bar
import { logoutUser } from "@/utils/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  // side bar logic start
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const user = getUserFromToken();
    setRole(user?.role);

    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (user?.role === "admin") {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setDashboardData(data);
      } else if (user?.role === "staff") {
        setDashboardData({});
      }
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
            <BulkUploadForm />
            <div>
              <Link href="/dashboard/products">
                <span className="text-blue-400 hover:underline">
                  Create Sale
                </span>
              </Link>

              <Link href="/dashboard/users">
                <span className="text-blue-400 hover:underline">
                  Manage Staff
                </span>
              </Link>
              <NavItem onClick={logoutUser} label="Logout" isButton />
            </div>
            <SalesSummary todaySales={dashboardData.todaySales} />
            <WeeklySalesChart weeklySales={dashboardData.weeklySales} />
            <StaffPerformanceTable staff={dashboardData.staffPerformance} />
            <StockOverview stock={dashboardData.stock} />

            <div className="p-6 border">
              <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
              <SalesList />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
              <AdminProductList />
            </div>
          </>
        )}

        {role === "staff" && (
          <div>
            <h3 className="font-semibold">Staff Dashboard</h3>
            <ul className="list-disc pl-6">
              {/* testing */}
              <Link href="/dashboard/sales">
                <span className="text-blue-400 hover:underline">
                  Create Sale
                </span>
              </Link>
              <li>View Invoices</li>
              <NavItem onClick={logoutUser} label="Logout" isButton />
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
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
