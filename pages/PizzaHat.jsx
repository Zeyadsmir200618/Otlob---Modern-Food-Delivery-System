import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaPlus, FaPizzaSlice, FaStar } from "react-icons/fa";

export default function PizzaHut() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost/food-delivery-system/backend/get_menu.php")
      .then((res) => res.json())
      .then((data) => {
        const pizzaItems = data.filter((item) => item.restaurant === "Pizza Hut");
        setMenu(pizzaItems);
      })
      .catch((err) => console.error("Menu Fetch Error:", err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div style={styles.page}>
      {/* 1. ANIMATIONS ENGINE */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .pizza-card {
          animation: slideIn 0.5s ease forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .pizza-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 60px rgba(228, 0, 43, 0.15) !important;
        }

        .pizza-icon-float {
          animation: pulse 3s infinite ease-in-out;
        }

        .add-button {
          transition: 0.3s;
        }

        .add-button:hover {
          letter-spacing: 1px;
          filter: brightness(1.2);
          transform: scale(1.05);
        }

        .back-link:hover {
          background: #ffebeb !important;
          color: #e4002b !important;
        }
      `}</style>

      {/* 2. HEADER */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn} className="back-link">
          <FaArrowLeft /> Back
        </button>
        <div style={styles.titleWrapper}>
           <FaPizzaSlice style={styles.floatingPizza} className="pizza-icon-float" />
           <h1 style={styles.brandTitle}>Pizza Hut</h1>
        </div>
        <button 
          onClick={() => navigate("/cart", { state: { cart } })} 
          style={styles.cartBtn}
        >
          <FaShoppingCart />
          <span style={styles.cartBadge}>{cart.length}</span>
        </button>
      </div>

      <p style={styles.tagline}>Hot. Fresh. Delivered to your door. 🍕</p>

      {/* 3. MENU GRID */}
      <div style={styles.grid}>
        {menu.length === 0 ? (
          <div style={styles.loader}>👩‍🍳 Preparing your menu...</div>
        ) : (
          menu.map((item, index) => (
            <div key={item.id} style={{...styles.card, animationDelay: `${index * 0.1}s`}} className="pizza-card">
              <div style={styles.imageBox}>
                <span style={styles.emoji}>🍕</span>
                <div style={styles.ratingTag}><FaStar /> 4.8</div>
              </div>
              
              <div style={styles.content}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.desc}>{item.description}</p>
                
                <div style={styles.footer}>
                  <div style={styles.priceContainer}>
                    <span style={styles.currency}>EGP</span>
                    <span style={styles.priceValue}>{item.price}</span>
                  </div>
                  <button onClick={() => addToCart(item)} style={styles.addBtn} className="add-button">
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
    background: "linear-gradient(135deg, #fff5f5 0%, #fff0f5 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif" 
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "10px" 
  },
  titleWrapper: { textAlign: "center" },
  floatingPizza: { fontSize: "40px", color: "#e4002b", marginBottom: "5px" },
  brandTitle: { 
    fontSize: "36px", 
    fontWeight: "900", 
    color: "#333", 
    margin: 0, 
    letterSpacing: "-1px" 
  },
  tagline: { textAlign: "center", color: "#888", marginBottom: "40px", fontSize: "16px" },
  backBtn: { 
    padding: "12px 20px", 
    borderRadius: "15px", 
    border: "none", 
    background: "white", 
    cursor: "pointer", 
    fontWeight: "bold",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    transition: "0.3s"
  },
  cartBtn: { 
    width: "60px",
    height: "60px",
    background: "white", 
    color: "#e4002b", 
    border: "none", 
    borderRadius: "20px", 
    fontSize: "22px",
    cursor: "pointer", 
    position: "relative",
    boxShadow: "0 10px 25px rgba(228, 0, 43, 0.1)"
  },
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#e4002b",
    color: "white",
    fontSize: "12px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid white"
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "35px" 
  },
  card: { 
    background: "white", 
    borderRadius: "30px", 
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    opacity: 0, // for animation
  },
  imageBox: {
    height: "180px",
    background: "linear-gradient(to bottom, #ff9a9e 0%, #fecfef 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  emoji: { fontSize: "80px" },
  ratingTag: {
    position: "absolute",
    bottom: "15px",
    right: "15px",
    background: "rgba(255,255,255,0.9)",
    padding: "5px 12px",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#ffb400"
  },
  content: { padding: "25px" },
  itemName: { fontSize: "22px", color: "#333", marginBottom: "8px", fontWeight: "800" },
  desc: { color: "#888", fontSize: "14px", lineHeight: "1.6", height: "45px", overflow: "hidden" },
  footer: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: "20px"
  },
  priceContainer: { display: "flex", flexDirection: "column" },
  currency: { fontSize: "12px", fontWeight: "bold", color: "#e4002b" },
  priceValue: { fontSize: "24px", fontWeight: "900", color: "#333" },
  addBtn: { 
    background: "linear-gradient(135deg, #e4002b, #ff4d4d)", 
    color: "white", 
    border: "none", 
    padding: "12px 25px", 
    borderRadius: "18px", 
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 8px 20px rgba(228, 0, 43, 0.2)"
  }
};