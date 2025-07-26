"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  // Update state
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Product"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Products</h2>
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.quantity}</td>
              <td className="border px-2 py-1">{p.category}</td>
              <td className="border px-2 py-1">
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg:red-600"
                  >
                    Delete
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && (
        <div className="mt-6 p-4 border rounded bg-gray-100 text-black">
          <h3 className="font-bold mb-2">Update Product</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = localStorage.getItem("token");
                await axios.put(
                  `http://localhost:5000/api/products/${editingProduct._id}`,
                  editingProduct,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                // Update product list
                setProducts((prev) =>
                  prev.map((p) =>
                    p._id === editingProduct._id ? editingProduct : p
                  )
                );

                alert("Product updated successfully!");
                setEditingProduct(null);
              } catch (error) {
                console.error("Update failed:", error);
                alert("Failed to update product");
              }
            }}
            className="space-y-2"
          >
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Product Name"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Price"
            />
            <input
              type="number"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Stock Quantity"
            />
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Category"
            />
            <div className="space-x-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
