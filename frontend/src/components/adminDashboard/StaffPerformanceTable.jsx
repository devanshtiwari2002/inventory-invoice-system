export default function StaffPerformanceTable({ staff }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Staff Performance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Sales Count</th>
              <th className="px-4 py-2">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((person) => (
              <tr key={person.email} className="border-t border-gray-700">
                <td className="px-4 py-2">{person.name}</td>
                <td className="px-4 py-2">{person.email}</td>
                <td className="px-4 py-2">{person.count}</td>
                <td className="px-4 py-2">₹{person.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
