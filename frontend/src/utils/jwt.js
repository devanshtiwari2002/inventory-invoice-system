import { jwtDecode } from "jwt-decode";

export function getUserFromToken() {
  // Check if running in browser (client-side)
  if (typeof window === "undefined") return null;

  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token); // { id, role, iat, exp, etc. }
    return decoded;
  } catch (err) {
    console.error("❌ Invalid or expired token:", err);
    return null;
  }
}
