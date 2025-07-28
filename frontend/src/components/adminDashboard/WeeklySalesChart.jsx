"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklySalesChart({ weeklySales }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Weekly Sales</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
