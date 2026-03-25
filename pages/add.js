import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Add() {
  const [data, setData] = useState({
    name: "",
    price: "",
    division: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!data.name || !data.price) {
      alert("সব তথ্য দাও");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      await addDoc(collection(db, "pumps"), {
        ...data,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        sotti: 0,
        mitha: 0,
        createdAt: new Date()
      });

      alert("✅ Successfully Added!");
      setLoading(false);
      setData({ name: "", price: "", division: "", city: "" });
    });
  };

  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
        width: "350px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          ⛽ Add Petrol Pump
        </h2>

        <input
          placeholder="Pump Name"
          value={data.name}
          onChange={(e)=>setData({...data,name:e.target.value})}
          style={inputStyle}
        />

        <select
          value={data.price}
          onChange={(e)=>setData({...data,price:e.target.value})}
          style={inputStyle}
        >
          <option value="">Select Price</option>
          <option>100 tk</option>
          <option>200 tk</option>
          <option>500 tk</option>
          <option>Full Tank</option>
        </select>

        <select
          value={data.division}
          onChange={(e)=>setData({...data,division:e.target.value})}
          style={inputStyle}
        >
          <option value="">Select Division</option>
          <option>Dhaka</option>
          <option>Rajshahi</option>
          <option>Chattogram</option>
          <option>Khulna</option>
        </select>

        <input
          placeholder="City"
          value={data.city}
          onChange={(e)=>setData({...data,city:e.target.value})}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            background: "#22c55e",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Adding..." : "Submit"}
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none"
};
