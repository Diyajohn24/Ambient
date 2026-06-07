"use client";
import { createToken } from "../lib/auth";
import React, { useState } from "react";

export default function SignIn({ onSignIn, goToCreate }: {
  onSignIn: () => void;
  goToCreate: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);

      console.log("JWT Token:", data.token);

      onSignIn();
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

  const handleBack = () => {
    goToCreate();
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={handleBack}>
        <span style={styles.backArrow}>←</span> Back
      </button>

      {/* Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to continue your journey</p>

        {/* Email Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>✉</span>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Password Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password:</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div style={styles.forgotWrapper}>
          <button style={styles.forgotButton} onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <button style={styles.signInButton} onClick={handleSignIn}>
          Sign in
        </button>
        <p
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "18px",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Don’t have an account?
        </p>

        <button
          onClick={goToCreate}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "30px",
            padding: "12px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#8B1A8B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontFamily: "'Segoe UI', sans-serif",
  },
  backButton: {
    position: "absolute",
    top: "24px",
    left: "24px",
    backgroundColor: "#C06EC0",
    color: "#1a1a2e",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  backArrow: {
    fontSize: "18px",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#C970C9",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "370px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "8px",
    marginTop: 0,
  },
  subtitle: {
    textAlign: "center",
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    marginBottom: "32px",
    marginTop: 0,
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#D98AD9",
    borderRadius: "30px",
    padding: "12px 18px",
    gap: "10px",
  },
  icon: {
    fontSize: "16px",
    color: "#1a1a1a",
    flexShrink: 0,
  },
  input: {
    border: "none",
    background: "transparent",
    outline: "none",
    color: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    width: "100%",
  },
  forgotWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "24px",
    marginTop: "4px",
  },
  forgotButton: {
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
    padding: 0,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#7B2D8B",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
};
