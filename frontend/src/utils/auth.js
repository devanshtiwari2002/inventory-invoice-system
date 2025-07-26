export function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // force reload + redirect
}
