import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaRocket,
  FaUtensils,
  FaLaptopCode,
  FaArrowLeft,
} from "react-icons/fa";

export default function AboutUs({ user }) {

  const navigate = useNavigate();

  const localUser =
    user || JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  const team = [
    { name: "Zeyad Mohamed", role: "Team Lead & Full-Stack Developer" },
    { name: "Mariam Mohamed", role: "UI/UX Engineer" },
    { name: "Myriam Hamam", role: "Backend & Database Engineer" },
    { name: "Mariam Mostafa", role: "QA & Documentation" },
  ];

  const highlights = [
    {
      icon: <FaRocket />,
      title: "Real Startup Simulation",
      desc: "A complete food delivery system modeled after real platforms like Talabat & Uber Eats.",
    },
    {
      icon: <FaUtensils />,
      title: "Full Order Flow System",
      desc: "From customer order → restaurant processing → dashboard tracking → final delivery flow.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Modern Full-Stack Architecture",
      desc: "Built using React for frontend, PHP for backend APIs, and MySQL database for persistent storage.",
    },
  ];

  return (
    <div style={styles.page}>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .float {
          position: absolute;
          font-size: 42px;
          opacity: 0.12;
          animation: float 6s ease-in-out infinite;
        }

        .f1 { top: 80px; left: 10%; }
        .f2 { top: 140px; right: 12%; }
        .f3 { bottom: 100px; left: 20%; }

        .card {
          transition: all 0.35s ease;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0,0,0,0.12);
        }

        .backBtn {
          transition: 0.3s;
        }

        .backBtn:hover {
          transform: scale(1.08);
        }
      `}</style>

      {/* NAVBAR */}
      <div style={styles.navbar}>

        <div style={styles.navLeft}>
          <button
            className="backBtn"
            style={styles.backBtn}
            onClick={() => navigate("/customer")}
          >
            <FaArrowLeft />
          </button>

          <h1 style={styles.logo}>🍔 Otlob</h1>
        </div>

        <div style={styles.userBox}>
          <FaUserCircle />
          <span>{localUser.name}</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div className="float f1">🍕</div>
        <div className="float f2">🍔</div>
        <div className="float f3">🍟</div>

        <h1 style={styles.heroTitle}>
          We’re building the future of food delivery.
        </h1>

        <p style={styles.heroText}>
          A modern, fast, and scalable food ordering system designed as a full startup simulation
          — from restaurant management to customer experience.
        </p>

        <div style={styles.badgeRow}>
          <span style={styles.badge}>🚀 Startup Project</span>
          <span style={styles.badge}>⚡ React Powered</span>
          <span style={styles.badge}>🍔 Food Tech System</span>
        </div>
      </div>

      {/* STORY */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Our Story</h2>

        <p style={styles.text}>
          Otlob started as a university project, but quickly evolved into a complete
          startup simulation. We wanted to understand how real-world platforms like
          Uber Eats or Talabat actually work — not just the UI, but the system behind it.
        </p>

        <p style={styles.text}>
          From user authentication to restaurant listings, dashboards, and ordering logic,
          every part of this system was designed to mimic a real production environment.
        </p>
      </div>

      {/* HIGHLIGHTS */}
      <div style={styles.sectionAlt}>
        <h2 style={styles.h2}>What Makes It Special</h2>

        <div style={styles.grid}>
          {highlights.map((h, i) => (
            <div key={i} style={styles.card} className="card">
              <div style={styles.iconBox}>{h.icon}</div>
              <h3>{h.title}</h3>
              <p style={{ opacity: 0.7 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH STACK */}
      <div style={styles.sectionAlt}>
        <h2 style={styles.h2}>Tech Stack</h2>

        <div style={styles.grid}>
          <div style={styles.card} className="card">
            <h3>⚛️ React.js</h3>
            <p style={{ opacity: 0.7 }}>
              Used to build a fast, responsive, component-based frontend with dynamic dashboards and routing.
            </p>
          </div>

          <div style={styles.card} className="card">
            <h3>🐘 PHP Backend</h3>
            <p style={{ opacity: 0.7 }}>
              Handles authentication, APIs, business logic, and communication between frontend and database.
            </p>
          </div>

          <div style={styles.card} className="card">
            <h3>🗄️ MySQL Database</h3>
            <p style={{ opacity: 0.7 }}>
              Stores users, orders, restaurants, and system data with structured relational design.
            </p>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Meet the Team</h2>

        <div style={styles.teamGrid}>
          {team.map((t, i) => (
            <div key={i} style={styles.teamCard} className="card">
              <div style={styles.avatar}>👨‍💻</div>
              <h3>{t.name}</h3>
              <p style={{ opacity: 0.7 }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <h3>Built with passion ❤️</h3>

        <p style={{ opacity: 0.7 }}>
          Otlob Food Delivery System — Startup Simulation Project
        </p>
      </div>
    </div>
  );
}

/* ===== OTLOB PREMIUM STYLE ===== */
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

  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  backBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#ff6b00,#ff944d)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    boxShadow: "0 10px 25px rgba(255,120,0,0.25)",
  },

  logo: {
    fontSize: "30px",
    fontWeight: "900",
    background: "linear-gradient(135deg,#ff6b00,#ff944d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
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
    padding: "120px 20px",
    color: "white",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,94,0,0.85), rgba(255,180,0,0.75)), url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1500&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "900",
    maxWidth: "900px",
    margin: "0 auto",
  },

  heroText: {
    fontSize: "18px",
    maxWidth: "750px",
    margin: "20px auto",
    opacity: 0.9,
    lineHeight: "1.6",
  },

  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  badge: {
    padding: "8px 14px",
    borderRadius: "50px",
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    fontSize: "13px",
  },

  section: {
    padding: "70px 50px",
  },

  sectionAlt: {
    padding: "70px 50px",
    background: "rgba(255,255,255,0.5)",
  },

  h2: {
    fontSize: "30px",
    marginBottom: "20px",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.8",
    maxWidth: "900px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "25px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.10)",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  teamCard: {
    textAlign: "center",
    padding: "25px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },

  avatar: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  iconBox: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#ff6b00",
  },

  footer: {
    padding: "50px",
    background: "#111",
    color: "white",
    textAlign: "center",
    marginTop: "50px",
  },
};