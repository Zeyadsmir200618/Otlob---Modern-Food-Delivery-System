import { ValidationStrategy } from "../utils/ValidationStrategy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  // STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

// Using the Validation Strategy Pattern
// --- Validation using Strategy Pattern ---
  
  // These variables are needed for your visual checklist (Rules Box)
  const hasLength = ValidationStrategy.hasLength(password);
  const hasUppercase = ValidationStrategy.hasUppercase(password);
  const hasNumber = ValidationStrategy.hasNumber(password);

  // These are for your overall form validation
  const validEmail = ValidationStrategy.isValidEmail(email);
  const validPhone = ValidationStrategy.isValidPhone(phone);
  const isPasswordStrong = ValidationStrategy.isPasswordStrong(password);
  const validAddress = ValidationStrategy.isValidAddress(address);
  const passwordsMatch = ValidationStrategy.doPasswordsMatch(password, confirmPassword);

  // --- End of Validation ---  // 🚀 REGISTER FUNCTION (FIXED - CONNECTS TO PHP + MYSQL)
const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Use the individual strategy results for specific alerts
   if (!validEmail) return alert("Invalid email domain (Use Gmail, Hotmail, or Yahoo)");
    if (!validPhone) return alert("Invalid Egyptian phone number");
    if (!validAddress) return alert("Address must be at least 10 characters");
    
    // 2. Use the "isPasswordStrong" strategy result for the password check
    if (!isPasswordStrong) {
      return alert("Weak password: Must be 8+ chars, with an Uppercase letter and a Number");
    }

    if (!passwordsMatch) return alert("Passwords do not match");

    // --- Everything below this line stays exactly the same ---
    setLoading(true);

    try {
      const res = await fetch("http://localhost/FOOD-DELIVERY-SYSTEM/backend/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert("Account created successfully ✅");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Server error. Check PHP / XAMPP.");
    }
  };

  return (
    <div style={styles.container}>
      {/* ANIMATIONS */}
      <style>{`
        .card-animation {
          animation: fadeIn 0.7s ease;
        }

        .logo-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logo-hover:hover {
          transform: scale(1.08) rotate(-2deg);
          text-shadow: 0 8px 20px rgba(255,107,0,0.4);
          color: #ff6b00;
        }

        .input-hover {
          transition: all 0.3s ease;
        }

        .input-hover:focus {
          border: 1px solid #ff6b00 !important;
          box-shadow: 0 0 15px rgba(255,107,0,0.25);
          transform: scale(1.02);
        }

        .register-btn {
          transition: all 0.3s ease;
        }

        .register-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 25px rgba(255,107,0,0.35);
        }

        .login-btn {
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background: #ff6b00 !important;
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255,107,0,0.25);
        }

        .rule-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 6px;
          border-radius: 8px;
        }

        .valid {
          background: #ecfdf3;
          color: #16a34a;
        }

        .invalid {
          background: #fff1f2;
          color: #dc2626;
        }

        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>

      <div style={styles.card} className="card-animation">
        <h1 style={styles.logo} className="logo-hover">
          Otlob 🍔
        </h1>

        <p style={styles.subtitle}>Create your account</p>

        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* RULES */}
          <div style={styles.rulesBox}>
            <div className={`rule-item ${hasLength ? "valid" : "invalid"}`}>
              8+ characters
            </div>
            <div className={`rule-item ${hasUppercase ? "valid" : "invalid"}`}>
              Uppercase letter
            </div>
            <div className={`rule-item ${hasNumber ? "valid" : "invalid"}`}>
              Number
            </div>
            <div className={`rule-item ${validEmail ? "valid" : "invalid"}`}>
              Valid email
            </div>
            <div className={`rule-item ${validPhone ? "valid" : "invalid"}`}>
              Valid phone
            </div>
            <div className={`rule-item ${validAddress ? "valid" : "invalid"}`}>
              Valid address
            </div>
            <div className={`rule-item ${passwordsMatch ? "valid" : "invalid"}`}>
              Password match
            </div>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <button
          style={styles.loginButton}
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff6b00,#ff944d)",
  },

  card: {
    width: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
  },

  logo: {
    fontSize: "40px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ff6b00",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },

  loginButton: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "white",
    border: "2px solid #ff6b00",
    color: "#ff6b00",
    borderRadius: "10px",
    cursor: "pointer",
  },

  rulesBox: {
    textAlign: "left",
    marginBottom: "10px",
  },
};

export default Register;