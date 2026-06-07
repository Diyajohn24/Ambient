"use client";
import react, { useState } from "react";

export default function CreateAccount({ onCreateAccount, goToSignIn }: {
  onCreateAccount: () => void;
  goToSignIn: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    console.log("Create account with:", { name, email, password });
    onCreateAccount();
  };

  return (
    <div style={styles.page}>
      {/* Phone Frame */}
      <div style={styles.phoneFrame}>
        {/* White Card */}
        <div style={styles.card}>
          <h1 style={styles.title}>Create your space</h1>
          <p style={styles.subtitle}>Begin your emotional wellness journey</p>

          {/* Name Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Name</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>👤</span>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <p style={styles.hint}>
              At least 8 characters with a mix of letters and numbers
            </p>
          </div>

          {/* Create Account Button */}
          <button style={styles.createButton} onClick={handleCreateAccount}>
            Create account
          </button>
          <button
  onClick={goToSignIn}
  style={{
    width: "100%",
    backgroundColor: "transparent",
    color: "#A0276A",
    border: "1px solid #A0276A",
    borderRadius: "30px",
    padding: "14px",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "16px",
  }}
>
  Back to Sign In
</button>

          {/* Terms */}
          <p style={styles.terms}>
            By creating an account, you agree to our Terms of Service and
            Privacy Policy. All emotional data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#C55FA8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  phoneFrame: {
    backgroundColor: "#1a1a1a",
    borderRadius: "40px",
    padding: "10px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    width: "100%",
    maxWidth: "380px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "32px",
    padding: "36px 28px 28px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "6px",
    marginTop: 0,
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    fontSize: "13px",
    marginBottom: "28px",
    marginTop: 0,
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    color: "#1a1a1a",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#6A2FC0",
    borderRadius: "30px",
    padding: "14px 18px",
    gap: "10px",
  },
  icon: {
    fontSize: "16px",
    color: "#ffffff",
    flexShrink: 0,
  },
  input: {
    border: "none",
    background: "transparent",
    outline: "none",
    color: "#ffffff",
    fontSize: "14px",
    width: "100%",
  },
  hint: {
    color: "#888",
    fontSize: "12px",
    marginTop: "6px",
    marginBottom: 0,
  },
  createButton: {
    width: "100%",
    backgroundColor: "#A0276A",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "12px",
    marginBottom: "16px",
    letterSpacing: "0.4px",
  },
  terms: {
    color: "#888",
    fontSize: "11px",
    textAlign: "center",
    lineHeight: "1.6",
    margin: 0,
  },
};
