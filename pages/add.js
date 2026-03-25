import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Add() {
  const [data,setData]=useState({
    name:"",
    price:"",
    city:"",
    user:""
  });

  const [loading,setLoading]=useState(false);

  // 🌍 city → location
  const getLocationFromCity = async (city) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city} Bangladesh`
    );
    const result = await res.json();
    return result[0];
  };

  const handleSubmit = async () => {
    if(!data.name || !data.city){
      alert("সব তথ্য দাও");
      return;
    }

    setLoading(true);

    try{
      const loc = await getLocationFromCity(data.city);

      if(!loc){
        alert("City পাওয়া যায় নাই");
        setLoading(false);
        return;
      }

      await addDoc(collection(db,"pumps"),{
        ...data,
        lat:parseFloat(loc.lat),
        lng:parseFloat(loc.lon),
        sotti:0,
        mitha:0,
        createdAt:new Date(),
        time:new Date().toLocaleString() // 🔥 readable time
      });

      alert("✅ Added Successfully");

      setData({
        name:"",
        price:"",
        city:"",
        user:""
      });

    }catch(err){
      console.error(err);
      alert("❌ Error hoise");
    }

    setLoading(false);
  };

  return (
    <div style={{
      background:"#0f172a",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{
        background:"#1e293b",
        padding:"25px",
        borderRadius:"15px",
        width:"350px",
        boxShadow:"0 0 20px rgba(0,0,0,0.5)"
      }}>

        <h2 style={{textAlign:"center"}}>⛽ Add Pump</h2>

        <input placeholder="Pump Name"
          value={data.name}
          onChange={e=>setData({...data,name:e.target.value})}
          style={input}/>

        <input placeholder="Price (100/200/full)"
          value={data.price}
          onChange={e=>setData({...data,price:e.target.value})}
          style={input}/>

        <input placeholder="City (Rajshahi, Dhaka)"
          value={data.city}
          onChange={e=>setData({...data,city:e.target.value})}
          style={input}/>

        <input placeholder="Your Name"
          value={data.user}
          onChange={e=>setData({...data,user:e.target.value})}
          style={input}/>

        <button onClick={handleSubmit} style={btn}>
          {loading ? "Adding..." : "Submit"}
        </button>

      </div>
    </div>
  );
}

const input={
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"8px",
  border:"none"
};

const btn={
  width:"100%",
  padding:"12px",
  background:"#22c55e",
  color:"#fff",
  border:"none",
  borderRadius:"10px"
};
