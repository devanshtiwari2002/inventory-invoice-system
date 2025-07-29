"use client";

import { useState } from "react";

const BulkUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      setUploading(true);
      // debugg
      console.log("Uploading file:", file);

      const res = await fetch("http://localhost:5000/api/products/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Products uploaded sucessfully");
      } else {
        setMessage(" uplaod failed " + data.message);
      }
    } catch (error) {
      console.error("Upload error", error);
      setMessage("upload failed" + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mt-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">📦 Bulk Product Upload</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? "Uploading..." : "Upload CSV"}
      </button>

      {message && (
        <p className="mt-3 text-sm font-medium text-gray-800">{message}</p>
      )}
    </div>
  );
};

export default BulkUploadForm;
