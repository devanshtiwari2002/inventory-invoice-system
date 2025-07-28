// "use client";
// import { useEffect, useState } from "react";

// export default function AdminUserList({ setEditUser }) {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:5000/api/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (res.ok) setUsers(data);
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!confirm("Delete this user?")) return;

//     const res = await fetch(`http://localhost:5000/api/users/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       alert("Deleted");
//       setUsers(users.filter((u) => u._id !== id));
//     } else {
//       alert("Delete failed");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold mb-2">All Staff</h3>
//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="text-left p-2">Name</th>
//             <th className="text-left p-2">Email</th>
//             <th className="text-left p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id} className="border-t">
//               <td className="p-2">{u.name}</td>
//               <td className="p-2">{u.email}</td>
//               <td className="p-2 flex gap-2">
//                 <button
//                   className="bg-blue-600 text-white px-3 py-1 rounded"
//                   onClick={() => setEditUser(u)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                   onClick={() => handleDelete(u._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminUserList({ setEditUser, refreshFlag }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) setUsers(data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Delete this user?")) return;

    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      toast.success("Deleted successfully");
      fetchUsers(); // refresh list
    } else {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshFlag]); // re-fetch when refreshFlag changes

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">All Staff</h3>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => setEditUser(u)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
