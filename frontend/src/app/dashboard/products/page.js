"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      console.log("token from localStorage", token);
      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(token);
      setMessage(res.data?.message || "Product Added Sucessfully");
      setFormData({
        name: "",
        costPrice: "",
        sellingPrice: "",
        stock: "",
        category: "",
        description: "",
      });
    } catch (error) {
      setMessage("failed to add product");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add new Product</h1>

        {message && <p className="mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="costPrice"
            placeholder="Cost Price"
            value={formData.costPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
