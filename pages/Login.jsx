import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("login.php", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {
        const user = res.data.user;

        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        console.log("LOGIN SUCCESS:", user);

        if (setUser) setUser(user);

        // Navigate based on role
        if (user.role && user.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* ANIMATIONS */}
      <style>
        {`
          .logo-hover {
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .logo-hover:hover {
            transform: scale(1.08) rotate(-2deg);
            color: #ff6b00;
            text-shadow: 0 5px 15px rgba(255,107,0,0.4);
          }

          .main-btn {
            transition: all 0.3s ease;
          }

          .main-btn:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 10px 20px rgba(255,107,0,0.35);
            opacity: 0.95;
          }

          .signup-btn {
            transition: all 0.3s ease;
          }

          .signup-btn:hover {
            background: #ff6b00 !important;
            color: white !important;
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255,107,0,0.25);
          }

          .input-hover {
            transition: all 0.3s ease;
          }

          .input-hover:focus {
            border: 1px solid #ff6b00 !important;
            box-shadow: 0 0 10px rgba(255,107,0,0.2);
            transform: scale(1.02);
          }

          .card-hover {
            transition: all 0.4s ease;
          }

          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
          }
        `}
      </style>

      <div style={styles.card} className="card-hover">
        <h1 style={styles.logo} className="logo-hover">
          Otlob 🍔
        </h1>

        <p style={styles.subtitle}>Fast food. Fast delivery.</p>

        <form onSubmit={handleLogin}>
          <input
            className="input-hover"
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input-hover"
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="main-btn" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.signupContainer}>
          <p style={styles.signupText}>Don’t have an account?</p>

          <button
            className="signup-btn"
            style={styles.signupButton}
            onClick={() => navigate("/Register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff6b00, #ff944d)",
    overflow: "hidden",
  },

  card: {
    width: "350px",
    padding: "35px",
    background: "white",
    borderRadius: "22px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  logo: {
    marginBottom: "10px",
    fontSize: "40px",
    fontWeight: "800",
  },

  subtitle: {
    marginBottom: "25px",
    color: "#777",
    fontSize: "15px",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "#ff6b00",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  signupContainer: {
    marginTop: "24px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },

  signupText: {
    color: "#777",
    marginBottom: "12px",
    fontSize: "14px",
  },

  signupButton: {
    width: "100%",
    padding: "13px",
    background: "white",
    color: "#ff6b00",
    border: "2px solid #ff6b00",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Login;