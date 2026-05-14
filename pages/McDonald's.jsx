import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaPlus, FaStar, FaUtensils } from "react-icons/fa";

export default function McDonalds() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost/food-delivery-system/backend/get_menu.php")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 Matches the 'restaurant' column in DB
        const items = data.filter((item) => item.restaurant === "McDonald's");
        setMenu(items);
      })
      .catch((err) => console.error("Menu Fetch Error:", err));
  }, []);

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div style={styles.page}>
      {/* 1. ANIMATION ENGINE */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mcd-card {
          animation: fadeInUp 0.6s ease forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .mcd-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(219, 0, 7, 0.15) !important;
        }

        .btn-hover {
          transition: 0.3s ease;
        }

        .btn-hover:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .back-btn:hover {
          background: #db0007 !important;
          color: white !important;
          transform: translateX(-5px);
        }
      `}</style>

      {/* 2. HEADER */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn} className="back-btn">
          <FaArrowLeft /> Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={styles.brandTitle}>🍟 McDonald's</h1>
          <p style={styles.tagline}>I'm lovin' it</p>
        </div>
        <button 
          onClick={() => navigate("/cart", { state: { cart } })} 
          style={styles.cartBtn}
          className="btn-hover"
        >
          <FaShoppingCart />
          <span style={styles.badge}>{cart.length}</span>
        </button>
      </div>

      {/* 3. MENU GRID */}
      <div style={styles.grid}>
        {menu.length === 0 ? (
          <div style={styles.loader}>🍔 Getting the fries ready...</div>
        ) : (
          menu.map((item, index) => (
            <div 
              key={item.id} 
              style={{ ...styles.card, animationDelay: `${index * 0.1}s` }} 
              className="mcd-card"
            >
              <div style={styles.imageBox}>
                <span style={styles.emoji}>🍟</span>
                <div style={styles.rating}><FaStar /> 4.9</div>
              </div>

              <div style={styles.content}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.desc}>{item.description}</p>
                <div style={styles.footer}>
                  <div style={styles.priceContainer}>
                    <span style={styles.currency}>EGP</span>
                    <span style={styles.priceValue}>{item.price}</span>
                  </div>
                  <button onClick={() => addToCart(item)} style={styles.addBtn} className="btn-hover">
                    <FaPlus /> Add
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { 
    minHeight: "100vh", 
    padding: "40px 8%", 
    background: "linear-gradient(135deg, #fff7cc 0%, #fffde6 100%)",
    fontFamily: "'Poppins', sans-serif" 
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "50px" 
  },
  backBtn: { 
    padding: "12px 20px", 
    borderRadius: "15px", 
    border: "none", 
    background: "white", 
    cursor: "pointer", 
    fontWeight: "bold",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#db0007"
  },
  brandTitle: { color: "#db0007", margin: 0, fontSize: "38px", fontWeight: "900" },
  tagline: { margin: 0, color: "#888", fontSize: "14px", fontWeight: "600" },
  cartBtn: { 
    width: "65px",
    height: "65px",
    background: "#ffbc0d", 
    color: "#000", 
    border: "none", 
    borderRadius: "22px", 
    fontSize: "24px",
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 15px 30px rgba(255, 188, 13, 0.3)" 
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#db0007",
    color: "white",
    fontSize: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid #fff7cc"
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "35px" 
  },
  card: { 
    background: "white", 
    borderRadius: "35px", 
    overflow: "hidden", 
    boxShadow: "0 15px 35px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    opacity: 0, 
  },
  imageBox: {
    height: "200px",
    background: "linear-gradient(to bottom, #db0007 0%, #ff4d4d 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  emoji: { fontSize: "90px" },
  rating: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "rgba(255,255,255,0.9)",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#db0007"
  },
  content: { padding: "25px", textAlign: "left" },
  itemName: { fontSize: "22px", fontWeight: "800", color: "#333", marginBottom: "10px" },
  desc: { color: "#777", fontSize: "14px", lineHeight: "1.5", height: "45px", overflow: "hidden" },
  footer: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #eee"
  },
  priceContainer: { display: "flex", flexDirection: "column" },
  currency: { fontSize: "12px", fontWeight: "bold", color: "#db0007" },
  priceValue: { fontSize: "24px", fontWeight: "900", color: "#333" },
  addBtn: { 
    background: "#db0007", 
    color: "white", 
    border: "none", 
    padding: "12px 22px", 
    borderRadius: "15px", 
    cursor: "pointer", 
    fontWeight: "bold" 
  },
  loader: { textAlign: "center", gridColumn: "1/-1", padding: "50px", fontSize: "18px", color: "#db0007", fontWeight: "bold" }
};