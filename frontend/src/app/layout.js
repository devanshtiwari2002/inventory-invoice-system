"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Toaster position="top-right" reverseOrder={false} /> {children}
      </body>
    </html>
  );
}
