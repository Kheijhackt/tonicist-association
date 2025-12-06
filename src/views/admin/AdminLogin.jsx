// AdminLogin.jsx
import { useState } from "react";
import LoadingModal from "../../components/LoadingModal";

export default function AdminLogin({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.authenticated) {
        onAuthenticated(password);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {/* Loading modal overlay */}
      <LoadingModal visible={loading} />

      <div
        style={{
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 12,
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Enter Admin Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            disabled={loading}
          />

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
