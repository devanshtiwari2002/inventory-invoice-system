"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-700">
          Inventory Management System
        </h1>
        <p className="text-gray-600">
          Efficiently manage your products, sales, and staff with ease.
        </p>

        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
