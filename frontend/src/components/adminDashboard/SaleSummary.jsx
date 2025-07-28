"use client";

export default function SalesSummary({ todaySales }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Today's Sales Summary</h2>
      <div className="flex gap-8">
        <div>
          <p className="text-sm">Total Sales</p>
          <p className="text-xl font-bold text-green-400">
            ₹{todaySales.total}
          </p>
        </div>
        <div>
          <p className="text-sm">Transactions</p>
          <p className="text-xl font-bold">{todaySales.count}</p>
        </div>
      </div>
    </div>
  );
}
