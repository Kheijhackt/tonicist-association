// api/admin-auth.js
export function isAdminAuthenticated(password) {
  return password === process.env.ADMIN_PASSWORD;
}
