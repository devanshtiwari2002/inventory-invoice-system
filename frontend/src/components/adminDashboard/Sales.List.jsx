"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "");

    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sales", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        setSales(res.data);
        setFilteredSales(res.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    if (savedToken) fetchSales();
  }, []);

  // Filter by customer name / phone / date
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = sales.filter((sale) => {
      return (
        sale.customerName?.toLowerCase().includes(term) ||
        sale.customerPhone?.includes(term) ||
        sale.date?.slice(0, 10).includes(term)
      );
    });

    setFilteredSales(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Invoices / Sales</h2>

      <input
        type="text"
        placeholder="Search by name, phone or date (YYYY-MM-DD)"
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Grand Total</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Staff</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <tr key={sale._id}>
                  <td className="p-2 border">{sale.customerName}</td>
                  <td className="p-2 border">{sale.customerPhone}</td>
                  <td className="p-2 border">₹{sale.grandTotal}</td>
                  <td className="p-2 border">{sale.paymentMode}</td>
                  <td className="p-2 border">{sale.date.slice(0, 10)}</td>
                  <td className="p-2 border">{sale.staff?.name || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
