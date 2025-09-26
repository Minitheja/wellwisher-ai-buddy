import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after login
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Log in to access your dashboard</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footer}>
          Don't have an account? <span style={styles.link} onClick={() => navigate("/register")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, hsl(var(--primary) / 60%) 0%, hsl(var(--primary) / 80%) 100%)", // lighter version
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: "40px 30px",
    width: "350px",
    textAlign: "center",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "28px",
    fontWeight: 700,
    color: "#333",
  },
  subtitle: {
    margin: "0 0 30px",
    fontSize: "14px",
    color: "#777",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "all 0.2s",
  },
  button: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#000DFF",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "underline",
  },
};

export default Login;
