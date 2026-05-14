import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaReceipt, FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost/food-delivery-system/backend/get_user_orders.php?user_id=${user.id}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user.id) fetchOrders();
  }, [user.id]);

  return (
    <div style={styles.page}>
      {/* 1. ANIMATION ENGINE */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .order-card {
          animation: slideIn 0.5s ease forwards;
          transition: 0.3s ease;
        }

        .order-card:hover {
          transform: scale(1.01);
          box-shadow: 0 15px 40px rgba(0,0,0,0.08) !important;
          border-color: #ff6b00 !important;
        }

        .empty-state {
          animation: fadeInUp 0.8s ease;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn} className="btn-hover">
          <FaArrowLeft /> Back
        </button>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Order History</h2>
          <p style={styles.subtitle}>Track and manage your previous meals</p>
        </div>
      </div>

      {loading ? (
        <div style={styles.loader}>👩‍💻 Fetching your delicious history...</div>
      ) : orders.length === 0 ? (
        <div style={styles.empty} className="empty-state">
          <div style={{fontSize: '80px'}}>🍱</div>
          <h3 style={{fontSize: '24px', color: '#2b3674'}}>No orders yet!</h3>
          <p style={{color: '#888'}}>Looks like you haven't ordered anything yet.</p>
          <button onClick={() => navigate("/customer")} style={styles.orderBtn}>Explore Menu</button>
        </div>
      ) : (
        <div style={styles.list}>
          {orders.map((order, index) => (
            <div 
              key={order.id} 
              style={{ ...styles.orderCard, animationDelay: `${index * 0.1}s` }} 
              className="order-card"
            >
              <div style={styles.cardHeader}>
                <div style={styles.orderRef}>
                   <div style={styles.iconBox}><FaReceipt /></div>
                   <div>
                     <span style={styles.idLabel}>Order ID</span>
                     <div style={styles.idValue}>#{order.id}</div>
                   </div>
                </div>
                <span style={{ 
                  ...styles.status, 
                  background: order.status === 'Pending' ? '#fff3e6' : '#e6fffa',
                  color: order.status === 'Pending' ? '#ed7902' : '#00bfa5'
                }}>
                  {order.status === 'Pending' ? <FaClock /> : <FaCheckCircle />} {order.status}
                </span>
              </div>

              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <FaCalendarAlt style={styles.detailIcon} />
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div style={styles.detailItem}>
                  <FaTruck style={styles.detailIcon} />
                  <span>{order.order_type}</span>
                </div>
                <div style={{...styles.detailItem, gridColumn: 'span 2'}}>
                  <FaMapMarkerAlt style={styles.detailIcon} />
                  <span>{order.location}</span>
                </div>
              </div>

              <div style={styles.itemsBox}>
                <div style={styles.itemsHeader}>Items Summary</div>
                <div style={styles.itemsList}>
                  {JSON.parse(order.items).map((i, idx) => (
                    <span key={idx} style={styles.itemTag}>
                      {i.name} <strong style={{color: '#ff6b00'}}>x{i.quantity || 1}</strong>
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.cardFooter}>
                <span style={styles.totalLabel}>Total Amount</span>
                <span style={styles.totalPrice}>{order.total_price} <small>EGP</small></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", padding: "40px 8%", background: "#f4f7fe", fontFamily: "'Poppins', sans-serif" },
  header: { display: "flex", alignItems: "center", gap: "30px", marginBottom: "40px" },
  backBtn: { 
    padding: "12px 20px", 
    borderRadius: "15px", 
    border: "none", 
    background: "white", 
    cursor: "pointer", 
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2b3674"
  },
  titleContainer: { textAlign: 'left' },
  title: { fontSize: "32px", fontWeight: "800", color: "#2b3674", margin: 0 },
  subtitle: { color: "#888", margin: 0, fontSize: "14px" },
  loader: { textAlign: "center", marginTop: "100px", fontSize: "18px", color: "#2b3674", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  orderBtn: { padding: "14px 30px", background: "linear-gradient(135deg,#ff6b00,#ff944d)", color: "white", border: "none", borderRadius: "14px", marginTop: "15px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 10px 20px rgba(255, 107, 0, 0.2)" },
  list: { display: "flex", flexDirection: "column", gap: "25px", maxWidth: "900px", margin: "0 auto" },
  orderCard: { 
    background: "white", 
    padding: "30px", 
    borderRadius: "24px", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)", 
    border: "2px solid transparent",
    opacity: 0 
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  orderRef: { display: "flex", alignItems: "center", gap: "15px" },
  iconBox: { width: "45px", height: "45px", background: "#f4f7fe", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", color: "#ff6b00", fontSize: "20px" },
  idLabel: { fontSize: "12px", color: "#888", display: "block" },
  idValue: { fontSize: "18px", fontWeight: "bold", color: "#2b3674" },
  status: { padding: "8px 16px", borderRadius: "12px", fontSize: "13px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "25px", background: "#f8f9fb", padding: "15px", borderRadius: "15px" },
  detailItem: { display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#555" },
  detailIcon: { color: "#ff6b00" },
  itemsBox: { marginBottom: "25px" },
  itemsHeader: { fontSize: "14px", fontWeight: "bold", color: "#2b3674", marginBottom: "10px" },
  itemsList: { display: "flex", flexWrap: "wrap", gap: "10px" },
  itemTag: { padding: "6px 14px", background: "#fff3e6", borderRadius: "8px", fontSize: "13px", color: "#502910", fontWeight: "500", border: "1px solid #ffe8d1" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #eee", paddingTop: "20px" },
  totalLabel: { fontSize: "15px", color: "#888", fontWeight: "500" },
  totalPrice: { fontSize: "26px", fontWeight: "900", color: "#e4002b" }
};