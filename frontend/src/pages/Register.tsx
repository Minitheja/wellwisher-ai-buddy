import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

interface FormData {
  role: string;
  name: string;
  email: string;
  password: string;
  major?: string;
  year?: string;
  livingSituation?: string;
  goals?: string;
  dob?: string;
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyNumber?: string;
  supportNetwork?: string;
}

const Register = () => {
  const [form, setForm] = useState<FormData>({
    role: "user",
    name: "",
    email: "",
    password: "",
    major: "",
    year: "",
    livingSituation: "",
    goals: "",
    dob: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyNumber: "",
    supportNetwork: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSwitch = (role: "user" | "counselor") => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to Wellwisher AI</h2>
        <p style={styles.subtitle}>Create your account</p>

        {/* Role switching buttons */}
        <div style={styles.roleSwitch}>
          <button
            type="button"
            onClick={() => handleRoleSwitch("user")}
            style={{
              ...styles.roleButton,
              ...(form.role === "user" ? styles.activeRole : {}),
            }}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch("counselor")}
            style={{
              ...styles.roleButton,
              ...(form.role === "counselor" ? styles.activeRole : {}),
            }}
          >
            Counselor
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Basic fields */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
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

          {/* Extra fields only for users */}
          {form.role === "user" && (
            <>
              <input
                type="text"
                name="major"
                placeholder="Major"
                value={form.major}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year of Study"
                value={form.year}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <select
                name="livingSituation"
                value={form.livingSituation}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Select Living Situation</option>
                <option value="On-campus dorm">On-campus dorm</option>
                <option value="Off-campus apartment">Off-campus apartment</option>
                <option value="With family">With family</option>
                <option value="Shared housing">Shared housing</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="goals"
                value={form.goals}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Select Your Main Goal</option>
                <option value="Improve Mental Health">Improve Mental Health</option>
                <option value="Better Productivity">Better Productivity</option>
                <option value="Social Support">Social Support</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <h4 style={styles.section}>Emergency Contact</h4>
              <input
                type="text"
                name="emergencyName"
                placeholder="Contact Name"
                value={form.emergencyName}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="text"
                name="emergencyRelation"
                placeholder="Relationship"
                value={form.emergencyRelation}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="tel"
                name="emergencyNumber"
                placeholder="Phone Number"
                value={form.emergencyNumber}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <textarea
                name="supportNetwork"
                placeholder="Personal Support Network"
                value={form.supportNetwork}
                onChange={handleChange}
                style={styles.textarea}
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
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
    background:
      "linear-gradient(135deg, hsl(var(--primary) / 60%) 0%, hsl(var(--primary) / 80%) 100%)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: "40px 30px",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    textAlign: "center",
  },
  title: {
    margin: "0 0 5px",
    fontSize: "28px",
    fontWeight: 700,
    color: "#333",
  },
  subtitle: {
    margin: "0 0 20px",
    fontSize: "14px",
    color: "#777",
  },
  roleSwitch: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  roleButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #1E90FF",
    background: "#fff",
    color: "#1E90FF",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s",
  },
  activeRole: {
    background: "linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  select: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    background: "#fff",
    cursor: "pointer",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    resize: "vertical",
    minHeight: "60px",
  },
  section: {
    margin: "10px 0 5px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#555",
    textAlign: "left",
  },
  button: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  buttonHover: {
    filter: "brightness(1.1)",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#1E90FF",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "underline",
  },
};


export default Register;
