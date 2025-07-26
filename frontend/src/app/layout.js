"use client";

import "./globals.css";
import Sidebar from "@/components/Sidebar";

// metadata for SEO
// export const metadata = {
//   title: "Inventory System",
//   description: "manage products, sales, users",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
