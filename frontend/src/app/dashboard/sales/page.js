// "use client";

// import ProtectedRoute from "@/components/ProtectedRoute";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function SalesPage() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [paymentMode, setPaymentMode] = useState("cash");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const inStockOnly = res.data.filter((p) => p.quantity > 0);
//       setProducts(inStockOnly);
//     };

//     fetchProducts();
//   }, []);
//   const handleQuantityChange = (productId, quantity) => {
//     setSelectedItems((prev) => {
//       const exists = prev.find((item) => item.productId === productId);
//       if (exists) {
//         return prev.map((item) =>
//           item.productId === productId ? { ...item, quantity } : item
//         );
//       } else {
//         const product = products.find((p) => p._id === productId);
//         return [
//           ...prev,
//           {
//             productId,
//             name: product.name,
//             price: product.price,
//             quantity,
//           },
//         ];
//       }
//     });
//   };

//   const calculateTotal = () =>
//     selectedItems.reduce(
//       (sum, item) => sum + item.price * (item.quantity || 0),
//       0
//     );

//   const [invoiceUrl, setInvoiceUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/sales/create",
//         {
//           customerName,
//           customerPhone,
//           paymentMode,
//           products: selectedItems,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const saleId = res.data.sale?._id;
//       setInvoiceUrl(`http://localhost:5000/invoices/invoice-${saleId}.pdf`);
//       setSuccess(true);
//       setCustomerName("");
//       setCustomerPhone("");
//       setSelectedItems([]);
//     } catch (err) {
//       console.error("Sale creation failed:", err);
//       alert("Something went wrong. Please try again.");
//     }
//   };
//   return (
//     <ProtectedRoute>
//       <div className="p-6 max-w-3xl mx-auto text-black bg-white rounded shadow">
//         <h1 className="text-2xl font-bold mb-4">Create New Sale</h1>

//         {success && (
//           <div className="p-3 mb-4 bg-green-100 text-green-800 rounded">
//             ✅ Sale created successfully and invoice has been generated.
//             {invoiceUrl && (
//               <a
//                 href={invoiceUrl}
//                 target="_blank"
//                 className="text-blue-600 underline block mt-2"
//               >
//                 📥 Download Invoice
//               </a>
//             )}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             required
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             placeholder="Customer Name"
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="text"
//             required
//             value={customerPhone}
//             onChange={(e) => setCustomerPhone(e.target.value)}
//             placeholder="Mobile Number"
//             className="w-full border p-2 rounded"
//           />

//           <div>
//             <label className="block font-semibold mb-2">Payment Mode:</label>
//             <select
//               value={paymentMode}
//               onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="cash">Cash</option>
//               <option value="upi">UPI</option>
//             </select>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-2">Select Products</h3>
//             {/* {products.map((p) => (
//               <div key={p._id} className="flex gap-3 items-center mb-2">
//                 <div className="w-32">{p.name}</div>
//                 <div className="w-20">₹{p.price}</div>
//                 <input
//                   type="number"
//                   min={0}
//                   placeholder="Qty"
//                   className="w-20 border p-1"
//                   onChange={(e) =>
//                     handleQuantityChange(p._id, parseInt(e.target.value))
//                   }
//                 />
//               </div>
//             ))} */}
//             {/* search */}
//             <input
//               type="text"
//               placeholder="Search by name or ID"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border p-2 rounded mb-4"
//             />
//             {/* Search Result */}
//             <ul className="max-h-40 overflow-y-auto border rounded">
//               {products
//                 .filter(
//                   (p) =>
//                     p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     p._id.includes(searchTerm)
//                 )
//                 .map((p) => (
//                   <li
//                     key={p._id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                     onClick={() => {
//                       if (
//                         !selectedItems.find((item) => item.productId === p._id)
//                       ) {
//                         setSelectedItems([
//                           ...selectedItems,
//                           {
//                             productId: p._id,
//                             name: p.name,
//                             price: p.sellingPrice,
//                             quantity: 1,
//                             stock: p.quantity,
//                           },
//                         ]);
//                       }
//                     }}
//                   >
//                     <span>{p.name}</span>
//                     <span className="text-sm text-gray-500">
//                       {p.sellingPrice}
//                     </span>
//                   </li>
//                 ))}
//             </ul>

//             {/* Selected Products Inputs */}
//             {selectedItems.map((item, index) => (
//               <div
//                 key={item.productId}
//                 className="flex items-center gap-3 mt-3"
//               >
//                 <div className="w-32">{item.name} </div>
//                 <div className="w-20">{item.price}</div>
//                 <input
//                   type="number"
//                   min={1}
//                   max={item.stock}
//                   value={item.quantity}
//                   className="w-20 border p-1"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     const updated = [...selectedItems];

//                     // Allow empty input to avoid crashing while typing
//                     updated[index].quantity =
//                       value === "" ? "" : Math.max(1, parseInt(value) || 1);

//                     setSelectedItems(updated);
//                   }}
//                   onBlur={(e) => {
//                     const updated = [...selectedItems];
//                     // Ensure value is at least 1 when focus leaves the input
//                     if (
//                       !updated[index].quantity ||
//                       updated[index].quantity < 1
//                     ) {
//                       updated[index].quantity = 1;
//                       setSelectedItems(updated);
//                     }
//                   }}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="text-lg font-bold">Total: ₹{calculateTotal()}</div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Create Sale
//           </button>
//         </form>
//       </div>
//     </ProtectedRoute>
//   );
// }

// ----------------------------

"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [success, setSuccess] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const inStockOnly = res.data.filter((p) => p.quantity > 0);
      setProducts(inStockOnly);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const hasInvalid = selectedItems.some(
      (item) => !item.quantity || isNaN(item.quantity) || item.quantity <= 0
    );
    if (hasInvalid) {
      alert("Please enter valid quantity for all selected products.");
      return;
    }

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

  const calculateTotal = () =>
    selectedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 0),
      0
    );

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

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          {/* Search result */}
          <ul className="max-h-40 overflow-y-auto border rounded">
            {products
              .filter(
                (p) =>
                  p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p._id.includes(searchTerm)
              )
              .map((p) => (
                <li
                  key={p._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    if (
                      !selectedItems.find((item) => item.productId === p._id)
                    ) {
                      setSelectedItems((prev) => [
                        ...prev,
                        {
                          productId: p._id,
                          name: p.name,
                          price: p.sellingPrice,
                          quantity: 1,
                          stock: p.quantity,
                        },
                      ]);
                    }
                  }}
                >
                  <span>{p.name}</span>
                  <span className="text-sm text-gray-500">
                    ₹{p.sellingPrice}
                  </span>
                </li>
              ))}
          </ul>

          {/* Selected product inputs */}
          {selectedItems.map((item, index) => (
            <div key={item.productId} className="flex items-center gap-3 mt-3">
              <div className="w-32">{item.name}</div>
              <div className="w-20">₹{item.price}</div>
              <input
                type="number"
                min={1}
                max={item.stock}
                value={item.quantity}
                className="w-20 border p-1"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const updated = [...selectedItems];
                  updated[index].quantity = isNaN(value)
                    ? 1
                    : Math.min(item.stock, Math.max(1, value));
                  setSelectedItems(updated);
                }}
              />
            </div>
          ))}

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
