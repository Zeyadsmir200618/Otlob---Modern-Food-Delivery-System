import { useState } from "react";

export default function TestConnection() {
  const [msg, setMsg] = useState("");

  const testAPI = () => {
    fetch("http://localhost/food-delivery-system/test.php")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg("Connection failed"));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>React ↔ PHP Test</h1>

      <button onClick={testAPI} style={{ padding: "10px 20px" }}>
        Test Backend
      </button>

      <h2 style={{ marginTop: "20px" }}>{msg}</h2>
    </div>
  );
}