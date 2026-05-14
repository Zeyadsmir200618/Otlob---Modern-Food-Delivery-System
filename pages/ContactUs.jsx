import { ValidationStrategy } from "../utils/ValidationStrategy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";

export default function ContactUs({ user }) {
  const navigate = useNavigate();

  const localUser =
    user || JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 🔥 ADDED: HANDLE INPUT CHANGE (This was missing and caused the crash)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SEND TO PHP BACKEND + MYSQL
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Apply Strategy Pattern instead of local regex
    if (!ValidationStrategy.isValidEmail(form.email)) {
      alert("❌ Invalid Email! Only Gmail, iCloud, Yahoo, or Hotmail are allowed.");
      return;
    }

    // 🔥 Apply Message length validation from Strategy
    if (form.message.trim().length < 10) {
      alert("❌ Message is too short! Please provide at least 10 characters.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/food-delivery-system/backend/send_message.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" }); // Reset form
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .food {
          position: absolute;
          font-size: 40px;
          opacity: 0.18;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .f1 { top: 40px; left: 10%; }
        .f2 { top: 120px; right: 12%; animation-delay: 1s; }
        .f3 { bottom: 40px; left: 20%; animation-delay: 2s; }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.18);
        }

        .icon {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: 0.3s;
        }

        .icon:hover {
          transform: scale(1.1);
          color: #ff6b00;
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .input {
          transition: 0.3s;
        }

        .input:focus {
          outline: none;
          border: 1px solid #ff6b00;
          box-shadow: 0 0 10px rgba(255,107,0,0.3);
        }
      `}</style>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>🍔 Otlob</h1>

        <div style={styles.navLinks}>
          <span className="icon" onClick={() => navigate("/customer")}>
            <FaArrowLeft /> Back
          </span>
        </div>

        <div style={styles.userBox}>
          <FaUserCircle size={20} />
          <span>{localUser.name}</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div className="food f1">🍕</div>
        <div className="food f2">🍔</div>
        <div className="food f3">🍟</div>

        <h1 style={styles.heroTitle}>Let’s Talk 👋</h1>

        <p style={styles.heroText}>
          Have questions, feedback, or partnership ideas?  
          Our team is always ready to help you.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Contact Information</h2>

        <div style={styles.grid}>
          <div style={styles.card} className="card">
            <h3><FaPhone /> Phone</h3>
            <p style={styles.text}>+20 100 000 0000</p>
          </div>

          <div style={styles.card} className="card">
            <h3><FaEnvelope /> Email</h3>
            <p style={styles.text}>support@otlob.com</p>
          </div>

          <div style={styles.card} className="card">
            <h3><FaMapMarkerAlt /> Location</h3>
            <p style={styles.text}>Cairo, Egypt</p>
          </div>
        </div>
      </div>

      {/* MESSAGE FORM */}
      <div style={styles.sectionAlt}>
        <h2 style={styles.h2}>Send Us a Message</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            className="input"
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            className="input"
            required
          />

          <button type="submit" style={styles.button} className="btn">
            <FaPaperPlane /> Send Message
          </button>
        </form>
      </div>

      {/* SOCIAL */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Follow Us</h2>

        <div style={styles.social}>
          <span className="icon"><FaInstagram /> Instagram</span>
          <span className="icon"><FaFacebook /> Facebook</span>
          <span className="icon"><FaTwitter /> Twitter</span>
          <span className="icon"><FaWhatsapp /> WhatsApp</span>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <h3>🍔 Otlob Food Delivery</h3>
        <p style={{ opacity: 0.7 }}>
          Built with React, PHP & MySQL
        </p>
      </div>
    </div>
  );
}

/* ===== PREMIUM OTLOB STYLE ===== */
const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial",
    color: "#222",
    position: "relative",
    overflowX: "hidden",
    background:
      "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontSize: "30px",
    fontWeight: "900",
    background: "linear-gradient(135deg,#ff6b00,#ff944d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  navLinks: {
    display: "flex",
    gap: "25px",
    fontWeight: "600",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff3e6",
    padding: "10px 16px",
    borderRadius: "50px",
    fontWeight: "600",
  },

  hero: {
    position: "relative",
    textAlign: "center",
    padding: "110px 20px",
    color: "white",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,94,0,0.85), rgba(255,180,0,0.75)), url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1500&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  heroTitle: {
    fontSize: "46px",
    fontWeight: "900",
    marginBottom: "15px",
  },

  heroText: {
    fontSize: "18px",
    opacity: 0.9,
    maxWidth: "700px",
    margin: "0 auto",
  },

  section: {
    padding: "70px 50px",
  },

  sectionAlt: {
    padding: "70px 50px",
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(10px)",
  },

  h2: {
    fontSize: "32px",
    marginBottom: "25px",
  },

  text: {
    opacity: 0.7,
    lineHeight: "1.7",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "25px",
    marginTop: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    borderRadius: "22px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.10)",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxWidth: "700px",
    marginTop: "20px",
  },

  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(0,0,0,0.1)",
    fontSize: "15px",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
  },

  textarea: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(0,0,0,0.1)",
    fontSize: "15px",
    minHeight: "150px",
    resize: "none",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
  },

  button: {
    width: "fit-content",
    padding: "14px 22px",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff6b00, #ffcc00, #ff4d4d)",
    boxShadow: "0 10px 25px rgba(255,120,0,0.25)",
  },

  social: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "20px",
    fontWeight: "600",
  },

  footer: {
    padding: "50px",
    background: "#111",
    color: "white",
    textAlign: "center",
    marginTop: "50px",
  },
};