import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaMapMarkerAlt, FaSave, FaArrowLeft } from "react-icons/fa";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost/food-delivery-system/backend/update_profile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(user)); 
        alert("✅ Profile updated successfully!");
        navigate("/customer");
      }
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🍕 FLOATING DECORATIONS */}
      <div className="food f1">🍕</div>
      <div className="food f2">🍔</div>
      <div className="food f3">🍟</div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .food {
          position: absolute;
          font-size: 50px;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }
        .f1 { top: 10%; left: 10%; }
        .f2 { top: 20%; right: 15%; animation-delay: 1s; }
        .f3 { bottom: 15%; left: 20%; animation-delay: 2s; }

        .input-group-hover {
          transition: all 0.3s ease;
          border: 2px solid transparent !important;
        }

        .input-group-hover:focus-within {
          border-color: #ff6b00 !important;
          background: white !important;
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 107, 0, 0.05);
        }

        .btn-hover {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(255, 107, 0, 0.4) !important;
          letter-spacing: 1px;
        }

        .back-link:hover {
          color: #ff6b00 !important;
          transform: translateX(-8px);
        }

        .profile-card {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      <div style={styles.card} className="profile-card">
        <button 
          onClick={() => navigate(-1)} 
          style={styles.backBtn} 
          className="back-link"
        >
          <FaArrowLeft /> Back to Home
        </button>
        
        <h2 style={styles.title}>Your Profile</h2>
        <p style={{textAlign: 'center', color: '#888', marginTop: '-20px', marginBottom: '30px', fontSize: '14px'}}>
          Keep your delivery details up to date
        </p>
        
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup} className="input-group-hover">
            <FaUser style={styles.icon} />
            <input 
              type="text" 
              value={user.name} 
              onChange={(e) => setUser({...user, name: e.target.value})} 
              style={styles.input} 
              placeholder="Full Name"
            />
          </div>

          <div style={styles.inputGroup} className="input-group-hover">
            <FaPhone style={styles.icon} />
            <input 
              type="text" 
              value={user.phone || ""} 
              onChange={(e) => setUser({...user, phone: e.target.value})} 
              style={styles.input} 
              placeholder="Phone Number"
            />
          </div>

          <div style={styles.inputGroup} className="input-group-hover">
            <FaMapMarkerAlt style={styles.icon} />
            <input 
              type="text" 
              value={user.address || ""} 
              onChange={(e) => setUser({...user, address: e.target.value})} 
              style={styles.input} 
              placeholder="Delivery Address"
            />
          </div>

          <button 
            type="submit" 
            style={styles.saveBtn} 
            className="btn-hover"
            disabled={loading}
          >
            {loading ? "Updating..." : <><FaSave /> Save My Details</>}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    minHeight: "100vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  card: { 
    background: "rgba(255, 255, 255, 0.9)", 
    backdropFilter: "blur(10px)",
    padding: "50px 40px", 
    borderRadius: "32px", 
    boxShadow: "0 30px 60px rgba(0,0,0,0.1)", 
    width: "100%", 
    maxWidth: "450px",
    zIndex: 1
  },
  backBtn: { 
    border: "none", 
    background: "none", 
    cursor: "pointer", 
    color: "#2b3674", 
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "700",
    transition: "0.3s",
  },
  title: { 
    textAlign: "center", 
    color: "#2b3674", 
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-1px"
  },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { 
    display: "flex", 
    alignItems: "center", 
    background: "#f4f7fe", 
    padding: "16px 20px", 
    borderRadius: "18px",
  },
  icon: { color: "#ff6b00", fontSize: "20px", marginRight: "15px" },
  input: { 
    border: "none", 
    background: "none", 
    width: "100%", 
    outline: "none",
    fontSize: "16px",
    color: "#2b3674",
    fontWeight: "600"
  },
  saveBtn: { 
    padding: "18px", 
    background: "linear-gradient(135deg, #ff6b00 0%, #ff8c33 100%)", 
    color: "white", 
    border: "none", 
    borderRadius: "18px", 
    cursor: "pointer", 
    fontWeight: "800", 
    fontSize: "16px",
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    gap: "12px",
    boxShadow: "0 10px 25px rgba(255, 107, 0, 0.3)",
    marginTop: "15px"
  },
};