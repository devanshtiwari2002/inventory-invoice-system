import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Users Page</h1>
      </div>
    </ProtectedRoute>
  );
}
