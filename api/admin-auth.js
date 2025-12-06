// api/admin-login.js
export default function handler(req, res) {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
}
