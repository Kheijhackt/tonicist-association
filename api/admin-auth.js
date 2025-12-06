// api/admin-auth.js

// backend function for password verification
export function verifyAdminPassword(password) {
  return password === process.env.ADMIN_PASSWORD;
}

// frontend handler endpoint
export default function handler(req, res) {
  const { password } = req.body;
  if (verifyAdminPassword(password)) {
    return res.status(200).json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
}
