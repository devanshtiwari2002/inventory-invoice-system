"use client"

import { useEffect, useState} from "react";
import axios from "axios";

export default function AdminProductList(){
    const [products, setProducts] = useState([]);

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
        } catch (error){
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    },[]);

    const handleDelete = async (id) => {
      const confirm = window.confirm("Are you sure you want to delete this Product");
      if(!confirm) return;

      try{
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          header : {
            Authorization : `Bearer ${token}`,
          },
        });

        setProducts(products.filter((product) => product._id !== id));
      } catch (error){
        console.error("Delete failed:", error);
        alert("Failed to delete product");
      }
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
                      <button onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg:red-600">Delete</button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    );
}