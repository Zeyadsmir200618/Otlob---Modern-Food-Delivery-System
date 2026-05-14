import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaPlus, FaStar } from "react-icons/fa";

export default function BurgerKing() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost/food-delivery-system/backend/get_menu.php")
      .then((res) => res.json())
      .then((data) => {
        const bkItems = data.filter((item) => item.restaurant === "Burger King");
        setMenu(bkItems);
      })
      .catch((err) => console.error("Menu Fetch Error:", err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div style={styles.page}>
      {/* 1. ANIMATIONS & HOVER EFFECTS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .burger-card {
          animation: fadeInUp 0.6s ease forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .burger-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(80, 41, 16, 0.15) !important;
        }

        .btn-hover {
          transition: 0.3s ease;
        }

        .btn-hover:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
          letter-spacing: 1px;
        }

        .back-btn:hover {
          background: #502910 !important;
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
          <h1 style={styles.brandTitle}>🍔 Burger King</h1>
          <p style={styles.tagline}>Home of the Whopper</p>
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
          <div style={styles.loader}>🔥 Lighting the grill...</div>
        ) : (
          menu.map((item, index) => (
            <div 
              key={item.id} 
              style={{ ...styles.card, animationDelay: `${index * 0.1}s` }} 
              className="burger-card"
            >
              <div style={styles.imageBox}>
                <span style={styles.emoji}>🍔</span>
                <div style={styles.rating}><FaStar /> 4.7</div>
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
    background: "linear-gradient(135deg, #fff3e6 0%, #ffe8d1 100%)",
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
    color: "#502910"
  },
  brandTitle: { color: "#502910", margin: 0, fontSize: "38px", fontWeight: "900" },
  tagline: { margin: 0, color: "#8b5e3c", fontSize: "14px", fontWeight: "600" },
  cartBtn: { 
    width: "65px",
    height: "65px",
    background: "#ed7902", 
    color: "white", 
    border: "none", 
    borderRadius: "22px", 
    fontSize: "24px",
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 15px 30px rgba(237, 121, 2, 0.3)" 
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#502910",
    color: "white",
    fontSize: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid #fff3e6"
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
    boxShadow: "0 15px 35px rgba(80, 41, 16, 0.05)",
    display: "flex",
    flexDirection: "column",
    opacity: 0, // start hidden for animation
  },
  imageBox: {
    height: "200px",
    background: "linear-gradient(to bottom, #f6d365 0%, #fda085 100%)",
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
    color: "#ed7902"
  },
  content: { padding: "25px", textAlign: "left" },
  itemName: { fontSize: "22px", fontWeight: "800", color: "#502910", marginBottom: "10px" },
  desc: { color: "#8b5e3c", fontSize: "14px", lineHeight: "1.5", height: "45px", overflow: "hidden" },
  footer: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #fef0e0"
  },
  priceContainer: { display: "flex", flexDirection: "column" },
  currency: { fontSize: "12px", fontWeight: "bold", color: "#ed7902" },
  priceValue: { fontSize: "24px", fontWeight: "900", color: "#502910" },
  addBtn: { 
    background: "#502910", 
    color: "white", 
    border: "none", 
    padding: "12px 22px", 
    borderRadius: "15px", 
    cursor: "pointer", 
    fontWeight: "bold" 
  },
  loader: { textAlign: "center", gridColumn: "1/-1", padding: "50px", fontSize: "18px", color: "#502910", fontWeight: "bold" }
};