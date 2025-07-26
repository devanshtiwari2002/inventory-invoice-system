import ProtectedRoute from "@/components/ProtectedRoute";

export default function SalesPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Sales Page</h1>
      </div>
    </ProtectedRoute>
  );
}
