import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaPlus, FaStar, FaFire } from "react-icons/fa";

export default function KFC() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  // 1. Fetch KFC Menu from PHP Backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost/food-delivery-system/backend/get_menu.php");
        const data = await response.json();
        
        // Filter to only show KFC items
        const kfcItems = data.filter(item => item.restaurant === 'KFC');
        setMenu(kfcItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // 2. Cart Logic
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const total = cart.reduce((sum, i) => Number(sum) + Number(i.price), 0);

  return (
    <div style={styles.page}>
      {/* 1. ANIMATION ENGINE */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .kfc-card {
          animation: fadeInUp 0.6s ease forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .kfc-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(228, 0, 43, 0.15) !important;
        }

        .btn-hover {
          transition: 0.3s ease;
        }

        .btn-hover:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .back-btn:hover {
          background: #e4002b !important;
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
          <h1 style={styles.brandTitle}>🍗 KFC</h1>
          <p style={styles.tagline}>Finger Lickin' Good</p>
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
          <div style={styles.loader}>🍗 Heating up the fryers...</div>
        ) : (
          menu.map((item, index) => (
            <div 
              key={item.id} 
              style={{ ...styles.card, animationDelay: `${index * 0.1}s` }} 
              className="kfc-card"
            >
              <div style={styles.imageBox}>
                <span style={styles.emoji}>🍗</span>
                <div style={styles.hotTag}><FaFire /> Popular</div>
                <div style={styles.rating}><FaStar /> 4.6</div>
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
    background: "linear-gradient(135deg, #fff7f0 0%, #ffebeb 100%)",
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
    color: "#e4002b"
  },
  brandTitle: { color: "#e4002b", margin: 0, fontSize: "38px", fontWeight: "900" },
  tagline: { margin: 0, color: "#888", fontSize: "14px", fontWeight: "600" },
  cartBtn: { 
    width: "65px",
    height: "65px",
    background: "linear-gradient(135deg, #e4002b, #ff7b00)", 
    color: "#fff", 
    border: "none", 
    borderRadius: "22px", 
    fontSize: "24px",
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 15px 30px rgba(228, 0, 43, 0.3)" 
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#fff",
    color: "#e4002b",
    fontSize: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid #ffebeb",
    fontWeight: "bold"
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
    background: "linear-gradient(to bottom, #e4002b 0%, #ff7b00 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  emoji: { fontSize: "90px" },
  hotTag: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(5px)",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
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
    color: "#ff7b00"
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
  currency: { fontSize: "12px", fontWeight: "bold", color: "#e4002b" },
  priceValue: { fontSize: "24px", fontWeight: "900", color: "#333" },
  addBtn: { 
    background: "linear-gradient(135deg, #e4002b, #ff7b00)", 
    color: "white", 
    border: "none", 
    padding: "12px 22px", 
    borderRadius: "15px", 
    cursor: "pointer", 
    fontWeight: "bold" 
  },
  loader: { textAlign: "center", gridColumn: "1/-1", padding: "50px", fontSize: "18px", color: "#e4002b", fontWeight: "bold" }
};