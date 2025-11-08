import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Using useContext instead of useAuth

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength in real-time
    if (name === "password") {
      checkPasswordStrength(value);
    }

    // Clear errors when user starts typing
    if (error) setError("");
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await API.post("/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      // Use AuthContext to handle login after successful signup
      if (res.data.token) {
        login({
          token: res.data.token,
          customerId: res.data.customerId,
          name: res.data.name,
          email: res.data.email,
        });

        setSuccess("Account created successfully! Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator component
  const PasswordStrengthIndicator = () => {
    if (!formData.password) return null;

    const strengthConfig = {
      weak: { color: "#dc3545", text: "Weak" },
      medium: { color: "#ffc107", text: "Medium" },
      strong: { color: "#28a745", text: "Strong" },
    };

    const config = strengthConfig[passwordStrength] || {
      color: "#6c757d",
      text: "",
    };

    return (
      <div style={{ marginTop: "5px", fontSize: "0.875rem" }}>
        <span style={{ color: config.color, fontWeight: "500" }}>
          Password strength: {config.text}
        </span>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Create Your Account</h2>
          <p>Join My Bank today for secure banking</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              style={styles.input}
              required
            />
            <PasswordStrengthIndicator />
            <div style={styles.passwordHint}>
              Must be at least 6 characters long
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.spinner}></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {error && (
          <div style={styles.alertError}>
            <span style={styles.alertIcon}>⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div style={styles.alertSuccess}>
            <span style={styles.alertIcon}>✅</span>
            {success}
          </div>
        )}

        <div style={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link to="/" style={styles.loginLink}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  headerH2: {
    color: "#333",
    marginBottom: "0.5rem",
    fontSize: "1.75rem",
    fontWeight: "600",
  },
  headerP: {
    color: "#666",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#333",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.75rem 1rem",
    border: "2px solid #e1e5e9",
    borderRadius: "6px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#667eea",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
  },
  passwordHint: {
    fontSize: "0.75rem",
    color: "#6c757d",
    marginTop: "4px",
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "0.875rem 1.5rem",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  alertError: {
    padding: "0.875rem 1rem",
    borderRadius: "6px",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
  alertSuccess: {
    padding: "0.875rem 1rem",
    borderRadius: "6px",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    backgroundColor: "#d1edff",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
  alertIcon: {
    fontSize: "1rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e9ecef",
  },
  loginLink: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "500",
  },
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Signup;
