"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddUserForm({ editUser, setEditUser, refreshUsers }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editUser) {
      setForm({
        name: editUser.name,
        email: editUser.email,
        password: "",
      });
    } else {
      setForm({ name: "", email: "", password: "" });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const url = editUser
      ? `http://localhost:5000/api/users/${editUser._id}`
      : "http://localhost:5000/api/users/create";
    const method = editUser ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, role: "staff" }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editUser ? "Staff updated!" : "Staff Member added!");
        setForm({ name: "", email: "", password: "" });
        setEditUser(null);
        refreshUsers(); // trigger user list reload
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-xl font-semibold">
        {editUser ? "Edit Staff User" : "Add Staff User"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder={editUser ? "New Password (optional)" : "Password"}
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required={!editUser}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? editUser
              ? "Updating..."
              : "Adding..."
            : editUser
            ? "Update"
            : "Add Staff"}
        </button>

        {editUser && (
          <button
            type="button"
            onClick={() => {
              setEditUser(null);
              setForm({ name: "", email: "", password: "" });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
