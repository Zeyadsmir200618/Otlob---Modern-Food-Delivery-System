import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaInfoCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaUserCircle,
} from "react-icons/fa";

function CustomerDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const localUser =
    user || JSON.parse(localStorage.getItem("user")) || { name: "Guest User" };

  const [restaurants] = useState([
    { id: 1, name: "KFC", desc: "Crispy fried chicken combo", rating: 4.5 },
    { id: 2, name: "Pizza Hut", desc: "Cheesy pizza & pasta", rating: 4.3 },
    { id: 3, name: "Burger King", desc: "Juicy burgers & fries", rating: 4.2 },
    { id: 4, name: "McDonald's", desc: "Classic fast food meals", rating: 4.4 },
  ]);

  const [offers] = useState([
    "🔥 50% OFF First Order",
    "🍕 Buy 1 Get 1 Pizza",
    "🚚 Free Delivery Over $10",
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  const openRestaurant = (name) => {
    setLoading(true);
    setTimeout(() => {
      switch (name) {
        case "KFC":
          navigate("/kfc");
          break;
        case "Pizza Hut":
          navigate("/Pizzahat");
          break;
        case "Burger King":
          navigate("/burgerking");
          break;
        case "McDonald's":
          navigate("/Mcdonald's");
          break;
        default:
          break;
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div style={styles.page}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loaderBox}>🍔 Loading restaurant...</div>
        </div>
      )}

      {/* GLOBAL ANIMATIONS */}
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
          cursor: pointer;
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
      `}</style>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>🍔 Otlob</h1>
        

        <div style={styles.navLinks}>
          <span className="icon" onClick={() => navigate("/profile")}>
      <FaUserCircle /> Profile
    </span>



          <span className="icon" onClick={() => navigate("/about")}>
            <FaInfoCircle /> About
          </span>

          <span className="icon" onClick={() => navigate("/contact")}>
            <FaPhone /> Contact
          </span>
          {/* 🔥 MODIFIED: Added onClick to navigate to Orders page */}
          <span className="icon" onClick={() => navigate("/orders")}>
            <FaShoppingCart /> Orders
          </span>
          <span className="icon" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </span>
        </div>

        <div style={styles.userBox}>
          <FaUserCircle />
          <span>{localUser.name}</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={{ position: "absolute", top: "20px", left: "10%" }}>🍕</div>
        <div style={{ position: "absolute", top: "60px", right: "15%" }}>🍔</div>
        <div style={{ position: "absolute", bottom: "30px", left: "20%" }}>🍟</div>
        <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Hungry? We deliver FAST 🚀
        </h2>

        <p style={{ opacity: 0.9, fontSize: "18px" }}>
          Your favorite food from top restaurants in one place
        </p>

        <button style={styles.button} className="btn">
          🍽️ Explore Restaurants
        </button>
      </div>

      {/* OFFERS */}
      <div style={styles.section}>
        <h3>🔥 Today’s Offers</h3>

        <div style={styles.offers}>
          {offers.map((o, i) => (
            <div key={i} style={styles.offerCard} className="card">
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANTS */}
      <div style={styles.section}>
        <h3>🍽️ Popular Restaurants</h3>

        <div style={styles.grid}>
          {restaurants.map((r) => (
            <div
              key={r.id}
              style={{ ...styles.card, cursor: "pointer" }}
              className="card"
              onClick={() => openRestaurant(r.name)}
            >
              <h3 style={{ marginBottom: "6px" }}>{r.name}</h3>
              <p style={{ color: "#666", marginBottom: "8px" }}>{r.desc}</p>
              <div style={{ marginBottom: "12px" }}>⭐ {r.rating}</div>

              {/* 🔥 MODIFIED: Changed onClick to navigate to the Orders page */}
              <button
                style={styles.button}
                className="btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevents double navigation
                  navigate("/orders");
                }}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>Follow us</p>

        <div style={styles.social}>
          <span className="icon"><FaInstagram /> Instagram</span>
          <span className="icon"><FaFacebook /> Facebook</span>
          <span className="icon"><FaTwitter /> Twitter</span>
          <span className="icon"><FaWhatsapp /> WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES (NO CHANGES) ===== */
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
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  loaderBox: {
    background: "white",
    padding: "25px 40px",
    borderRadius: "16px",
    fontSize: "18px",
    fontWeight: "bold",
    animation: "pulse 1s infinite",
  },

  navbar: {
   display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 5%",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
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
  section: {
    padding: "60px 40px",
  },

  offers: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  offerCard: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "18px",
    flex: "1",
    minWidth: "220px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    border: "1px solid rgba(255,255,255,0.4)",
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
  button: {
    marginTop: "10px",
    padding: "12px 18px",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff6b00, #ffcc00, #ff4d4d)",
    boxShadow: "0 10px 25px rgba(255,120,0,0.25)",
  },
  footer: {
    padding: "40px",
    background: "#111",
    color: "white",
    textAlign: "center",
    marginTop: "50px",
  },

  social: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
    flexWrap: "wrap",
  },
};

export default CustomerDashboard;