"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    };

    fetchProducts();
  }, []);
  const handleQuantityChange = (productId, quantity) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.productId === productId);
      if (exists) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      } else {
        const product = products.find((p) => p._id === productId);
        return [
          ...prev,
          {
            productId,
            name: product.name,
            price: product.price,
            quantity,
          },
        ];
      }
    });
  };

  const calculateTotal = () =>
    selectedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 0),
      0
    );

  const [invoiceUrl, setInvoiceUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sales/create",
        {
          customerName,
          customerPhone,
          paymentMode,
          products: selectedItems,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const saleId = res.data.sale?._id;
      setInvoiceUrl(`http://localhost:5000/invoices/invoice-${saleId}.pdf`);
      setSuccess(true);
      setCustomerName("");
      setCustomerPhone("");
      setSelectedItems([]);
    } catch (err) {
      console.error("Sale creation failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <ProtectedRoute>
      <div className="p-6 max-w-3xl mx-auto text-black bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create New Sale</h1>

        {success && (
          <div className="p-3 mb-4 bg-green-100 text-green-800 rounded">
            ✅ Sale created successfully and invoice has been generated.
            {invoiceUrl && (
              <a
                href={invoiceUrl}
                target="_blank"
                className="text-blue-600 underline block mt-2"
              >
                📥 Download Invoice
              </a>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            required
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Mobile Number"
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block font-semibold mb-2">Payment Mode:</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Select Products</h3>
            {products.map((p) => (
              <div key={p._id} className="flex gap-3 items-center mb-2">
                <div className="w-32">{p.name}</div>
                <div className="w-20">₹{p.price}</div>
                <input
                  type="number"
                  min={0}
                  placeholder="Qty"
                  className="w-20 border p-1"
                  onChange={(e) =>
                    handleQuantityChange(p._id, parseInt(e.target.value))
                  }
                />
              </div>
            ))}
          </div>

          <div className="text-lg font-bold">Total: ₹{calculateTotal()}</div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Sale
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
