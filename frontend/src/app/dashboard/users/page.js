"use client";
import { useState } from "react";
import AddUserForm from "@/components/AddUserForm";
import AdminUserList from "@/components/AdminUserList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  const [editUser, setEditUser] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refreshUsers = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-8">
        <AddUserForm
          editUser={editUser}
          setEditUser={setEditUser}
          refreshUsers={refreshUsers}
        />
        <hr />
        <AdminUserList setEditUser={setEditUser} refreshFlag={refreshFlag} />
      </div>
    </ProtectedRoute>
  );
}
