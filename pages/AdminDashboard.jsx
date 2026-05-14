import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost/food-delivery-system/backend/admin_orders.php");
      const data = await res.json();
      
      if (data.success) {
        setOrdersList(data.orders); 
      }
    } catch (error) {
      console.error("Admin API Error:", error);
    }
  };

  // 2. USE THE OBSERVER PATTERN (useEffect) TO CALL IT
  useEffect(() => {
    fetchOrders(); // Fetches orders automatically when the page opens
  }, []);

  const [activeTab, setActiveTab] = useState("overview");
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

const handleReply = (id) => {
  const reply = prompt("Write reply:");
  if (!reply) return;

  setMessagesList((prev) =>
    prev.map((m) =>
      m.id === id ? { ...m, reply } : m
    )
  );
};


const deleteMessage = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  try {
    const res = await fetch(
      "http://localhost/food-delivery-system/backend/delete_message.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setMessagesList((prev) => prev.filter((m) => m.id !== id));
    } else {
      alert("Failed to delete message");
    }
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};
  // ✅ PUT IT HERE
 useEffect(() => {
  fetch("http://localhost/food-delivery-system/backend/get_messages.php")
    .then((res) => res.json())
    .then((data) => {
      console.log("MESSAGES API:", data);
      setMessagesList(data);
    })
    .catch((err) => console.log("FETCH ERROR:", err));
}, []);
  useEffect(() => {
    fetch("http://localhost/food-delivery-system/backend/get_users.php")
      .then((res) => res.json())
      .then((data) => setUsersList(data))
      .catch((err) => console.log(err));
  }, []);
  // --- PROTECTION ---
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // --- FUNCTIONS ---
const deleteUser = async (id) => {
  if (window.confirm("Are you sure you want to remove this user?")) {

    try {
      const res = await fetch("http://localhost/food-delivery-system/backend/delete_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setUsersList(usersList.filter((u) => u.id !== id));
      } else {
        alert("Failed to delete user");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }
};
const deleteOrder = async (id) => {
  if (!window.confirm("Delete this order?")) return;

  const res = await fetch("http://localhost/food-delivery-system/backend/admin_orders.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      action: "delete", // Must match $data['action'] in PHP
      id: id            // Must match $data['id'] in PHP
    }),
  });

  const data = await res.json();
  if (data.success) {
    // This removes it from the UI immediately
    setOrdersList(prev => prev.filter(order => order.id !== id));
  }
};
  const completeOrder = (id) => {
    setOrdersList(
      ordersList.map((o) =>
        o.id === id ? { ...o, status: "Completed ✅" } : o
      )
    );
  };

  if (!user) return <div>Loading...</div>;
  

  return (
    <div className="admin-page">

      {/* ANIMATIONS + CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #f4f7fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2b3674;
        }

        /* NAVBAR */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 30px;
          background: linear-gradient(135deg, #ff6b00, #ff8c33);
          color: white;
          box-shadow: 0 4px 20px rgba(255, 107, 0, 0.25);
        }

        .navbar h2 {
          margin: 0;
          font-size: 28px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .navbar h2:hover {
          transform: scale(1.08) rotate(-2deg);
          text-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .btn-logout {
          background: white;
          color: #ff6b00;
          border: none;
          padding: 11px 22px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .btn-logout:hover {
          background: #ffe5d0;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        /* MAIN LAYOUT */
        .container {
          display: flex;
          padding: 30px;
          gap: 30px;
          max-width: 1450px;
          margin: auto;
        }

        /* SIDEBAR */
        .sidebar {
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tab-btn {
          background: white;
          border: none;
          padding: 16px;
          text-align: left;
          border-radius: 14px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #a3aed1;
          transition: all 0.3s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .tab-btn:hover {
          background: #fff5eb;
          color: #ff6b00;
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 10px 25px rgba(255,107,0,0.12);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #ff6b00, #ff8c33);
          color: white;
          box-shadow: 0 10px 25px rgba(255,107,0,0.3);
        }

        /* CONTENT */
        .content {
          flex: 1;
          background: white;
          padding: 35px;
          border-radius: 24px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          animation: fadeIn 0.4s ease;
        }

        .content h3 {
          margin-top: 0;
          color: #2b3674;
          font-size: 28px;
          margin-bottom: 25px;
        }

        .welcome-card {
          background: linear-gradient(to right, #ffffff, #fff5eb);
          padding: 28px;
          border-radius: 18px;
          border-left: 6px solid #ff6b00;
          margin-bottom: 25px;
          transition: all 0.3s ease;
        }

        .welcome-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 25px rgba(255,107,0,0.15);
        }

        /* TABLE */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        .data-table th,
        .data-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #edf0f7;
          transition: 0.2s;
        }

        .data-table th {
          color: #a3aed1;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
        }

        .data-table tr:hover td {
          background: #fffaf5;
        }

        /* BADGES */
        .badge {
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .badge.pending {
          background: #fff5eb;
          color: #ff9800;
        }

        .badge.preparing {
          background: #e3f2fd;
          color: #2196f3;
        }

        .badge.completed {
          background: #e8f5e9;
          color: #4caf50;
        }

        /* BUTTONS */
        .action-btn {
          border: none;
          padding: 9px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
          transition: all 0.3s ease;
          margin-right: 8px;
        }

        .action-btn:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .btn-delete {
          background: #fee2e2;
          color: #ef4444;
        }

        .btn-delete:hover {
          background: #fecaca;
          box-shadow: 0 8px 18px rgba(239,68,68,0.2);
        }

        .btn-success {
          background: #dcfce7;
          color: #22c55e;
        }

        .btn-success:hover {
          background: #bbf7d0;
          box-shadow: 0 8px 18px rgba(34,197,94,0.2);
        }

        /* EMPTY */
        .empty-state {
          text-align: center;
          padding: 60px;
          color: #999;
          font-size: 20px;
          border: 2px dashed #ddd;
          border-radius: 18px;
          background: #fafafa;
          transition: all 0.3s ease;
        }

        .empty-state:hover {
          background: #fff8f2;
          transform: scale(1.01);
        }

        /* ANIMATION */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="navbar">
        <h2>🍔 Otlob Admin</h2>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="container">

        {/* SIDEBAR */}
        <div className="sidebar">

          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>

          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 Manage Orders
          </button>

          <button
            className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </button>
           <button
    className={`tab-btn ${activeTab === "messages" ? "active" : ""}`}
    onClick={() => setActiveTab("messages")}
  >
    💬 Messages
  </button>

        </div>

        {/* CONTENT */}
        <div className="content">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <h3>Dashboard Overview</h3>

              <div className="welcome-card">
                <h2>👋 Welcome back, {user?.name}!</h2>

                <p style={{ color: "#777", marginTop: "8px" }}>
                  Role: <strong>{user?.role}</strong>
                </p>
              </div>

              <p style={{ fontSize: "16px", color: "#666" }}>
                Use the menu on the left to manage your platform efficiently.
              </p>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div>
              <h3>Active Orders</h3>

              {ordersList.length === 0 ? (
                <div className="empty-state">
                  🚫 No orders found
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                  {ordersList.map((order) => {
                    let parsedItems = [];
                    try {
                      parsedItems = JSON.parse(order.items);
                    } catch (e) {
                      parsedItems = [];
                    }

                    return (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td><strong>{order.customer_name || `User ${order.user_id}`}</strong></td>
                        <td>
                          {parsedItems.map((item, index) => (
                            <div key={index} style={{ fontSize: '12px', color: '#555' }}>
                              • {item.name} (x{item.quantity || 1})
                            </div>
                          ))}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>{order.total_price} EGP</td>
                        <td>
                          <span style={{ padding: '4px 8px', borderRadius: '12px', background: '#fff3e6', color: '#ff6b00', fontSize: '11px', fontWeight:'bold' }}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            {order.status !== 'Delivered' && (
                              <button 
                                onClick={() => updateStatus(order.id, 'Delivered')} 
                                className="action-btn btn-success"
                              >
                                Complete
                              </button>
                            )}
                            <button 
                              onClick={() => deleteOrder(order.id)} 
                              className="action-btn btn-delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                </table>
              )}
            </div>
          )}
       
          {/* USERS */}
          {activeTab === "users" && (
            <div>
              <h3>Registered Users</h3>

              {usersList.length === 0 ? (
                <div className="empty-state">
                  🚫 No users found
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td><strong>{u.name}</strong></td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>

                        <td>
                          <button
                            className="action-btn btn-delete"
                            onClick={() => deleteUser(u.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          
          {/* MESSAGES */}
  {activeTab === "messages" && (
    <div>
      <h3>Contact Messages</h3>

      {messagesList.length === 0 ? (
        <div className="empty-state">🚫 No messages</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {messagesList.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.message}</td>
                <td>{m.reply || "No reply yet"}</td>

                <td>
                  <button
                    className="action-btn btn-delete"
                    onClick={() => deleteMessage(m.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="action-btn btn-success"
                    onClick={() => handleReply(m.id)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )}

        </div>
      </div>
    </div>
  );
  
}