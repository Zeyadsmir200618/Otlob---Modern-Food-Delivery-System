import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaArrowLeft, FaTruck, FaStore, FaCreditCard, FaWallet, FaMoneyBillWave } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState(location.state?.cart || []);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const [orderType, setOrderType] = useState("delivery");
  const [pickupLocation, setPickupLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    if (orderType === "pickup" && !pickupLocation) return alert("Please select a pickup location!");

    const orderData = {
      user_id: user.id,
      total_price: total,
      items: cartItems,
      order_type: orderType,
      location: orderType === "pickup" ? pickupLocation : user.address,
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch("http://localhost/food-delivery-system/backend/place_order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (result.success) {
        alert("🎉 Order Placed Successfully!");
        navigate("/customer");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div style={styles.page}>
      {/* 1. ANIMATION ENGINE */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cart-item {
          animation: slideUp 0.4s ease forwards;
        }

        .checkout-btn {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .checkout-btn:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
          box-shadow: 0 10px 25px rgba(40, 167, 69, 0.3) !important;
        }

        .tab-button { transition: 0.3s; }
        .tab-button:hover { background: #fdf2f2; }
      `}</style>

      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h2 style={styles.title}>Review Order</h2>
      </div>

      <div style={styles.container}>
        {/* 1. ITEMS LIST */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Your Selected Items</h3>
          {cartItems.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px'}}>
               <div style={{fontSize: '40px'}}>🛒</div>
               <p style={{color: '#888'}}>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} style={{...styles.card, animationDelay: `${i * 0.1}s`}} className="cart-item">
                <div style={styles.itemInfo}>
                  <div style={styles.itemIcon}>🍔</div>
                  <span style={styles.itemName}>{item.name}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <span style={styles.priceText}>{item.price} EGP</span>
                  <button onClick={() => removeItem(i)} style={styles.deleteBtn} className="btn-hover">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
          <div style={styles.totalRow}>
            <span>Grand Total</span>
            <span>{total} EGP</span>
          </div>
        </div>

        {/* 2. ORDER TYPE */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Fulfillment Method</h3>
          <div style={styles.tabGroup}>
            <button 
              style={orderType === "delivery" ? styles.tabActive : styles.tab} 
              className="tab-button"
              onClick={() => setOrderType("delivery")}
            >
              <FaTruck /> Delivery
            </button>
            <button 
              style={orderType === "pickup" ? styles.tabActive : styles.tab} 
              className="tab-button"
              onClick={() => setOrderType("pickup")}
            >
              <FaStore /> Pickup
            </button>
          </div>

          <div style={styles.infoContainer}>
            {orderType === "delivery" ? (
              <div style={styles.infoBox}>
                <strong>📍 Destination Address</strong>
                <p style={{margin: '5px 0 0', color: '#666'}}>{user.address || "Please add address in profile"}</p>
              </div>
            ) : (
              <select style={styles.select} value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                <option value="">-- Select Pickup Point --</option>
                <option value="Maadi Branch">Maadi - Road 9</option>
                <option value="Zamalek Branch">Zamalek - 26th July St.</option>
                <option value="Nasr City Branch">Nasr City - City Stars</option>
              </select>
            )}
          </div>
        </div>

        {/* 3. PAYMENT */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Payment Securely</h3>
          <div style={styles.radioGroup}>
            {[
              {id: "cash", label: "Cash on Delivery", icon: <FaMoneyBillWave/>},
              {id: "visa", label: "Credit Card", icon: <FaCreditCard/>},
              {id: "instapay", label: "InstaPay", icon: <FaWallet/>},
              {id: "wallet", label: "Vodafone Cash", icon: <FaWallet/>}
            ].map((method) => (
              <label key={method.id} style={paymentMethod === method.id ? styles.radioLabelActive : styles.radioLabel}>
                <input 
                  type="radio" 
                  name="payment" 
                  value={method.id} 
                  style={{display: 'none'}}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span style={{color: paymentMethod === method.id ? '#e4002b' : '#666'}}>{method.icon}</span>
                <span style={{marginLeft: '10px'}}>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button style={styles.payBtn} className="checkout-btn" onClick={handleCheckout}>
          Place Order • {total} EGP
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Poppins', sans-serif", background: "#f8f9fb", minHeight: "100vh" },
  header: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: "20px 8%", 
    background: "linear-gradient(135deg,#e4002b,#ff7b00)", 
    color: "white",
    boxShadow: "0 4px 15px rgba(228, 0, 43, 0.2)"
  },
  title: { margin: 0, fontSize: '24px', fontWeight: '800' },
  backBtn: { 
    background: "rgba(255,255,255,0.2)", 
    border: "none", 
    padding: "10px 18px", 
    borderRadius: "12px", 
    color: 'white', 
    cursor: "pointer", 
    fontWeight: "bold",
    backdropFilter: 'blur(5px)'
  },
  container: { padding: "30px 8%", maxWidth: '800px', margin: '0 auto' },
  section: { 
    background: 'white', 
    padding: '25px', 
    borderRadius: '24px', 
    marginBottom: '20px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
  },
  sectionTitle: { margin: '0 0 20px 0', fontSize: '18px', color: '#2b3674', fontWeight: '700' },
  card: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: 'center', 
    padding: "15px 0", 
    borderBottom: '1px solid #f1f1f1',
    opacity: 0
  },
  itemInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  itemIcon: { fontSize: '24px', background: '#fff3f3', padding: '8px', borderRadius: '12px' },
  itemName: { fontWeight: '600', color: '#333' },
  priceText: { fontWeight: "800", color: "#e4002b", fontSize: '16px' },
  deleteBtn: { 
    background: '#fff0f0', 
    color: '#e4002b', 
    border: 'none', 
    padding: '10px', 
    borderRadius: '12px', 
    cursor: 'pointer'
  },
  totalRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontWeight: '900', 
    fontSize: '22px', 
    marginTop: '20px', 
    color: '#2b3674',
    paddingTop: '15px',
    borderTop: '2px solid #f8f9fb'
  },
  tabGroup: { display: 'flex', gap: '12px', marginBottom: '20px' },
  tab: { 
    flex: 1, padding: '14px', borderRadius: '15px', border: '2px solid #f1f1f1', 
    background: 'white', cursor: 'pointer', fontWeight: '600', color: '#666',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
  },
  tabActive: { 
    flex: 1, padding: '14px', borderRadius: '15px', border: '2px solid #e4002b', 
    background: '#fff5f5', color: '#e4002b', fontWeight: 'bold', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
  },
  select: { width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #f1f1f1', outline: 'none' },
  radioGroup: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' },
  radioLabel: { 
    display: 'flex', alignItems: 'center', padding: '15px', border: '2px solid #f1f1f1', 
    borderRadius: '15px', cursor: 'pointer', fontSize: '14px', transition: '0.3s' 
  },
  radioLabelActive: { 
    display: 'flex', alignItems: 'center', padding: '15px', border: '2px solid #e4002b', 
    background: '#fff5f5', borderRadius: '15px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' 
  },
  payBtn: { 
    width: "100%", padding: "18px", background: "#28a745", color: "white", 
    border: "none", borderRadius: "20px", fontWeight: "900", fontSize: '18px', 
    cursor: "pointer", boxShadow: '0 8px 20px rgba(40, 167, 69, 0.2)',
    marginTop: '10px'
  },
};