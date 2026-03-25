import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Add() {
  const [data, setData] = useState({});

  const handleSubmit = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await addDoc(collection(db, "pumps"), {
        ...data,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        sotti: 0,
        mitha: 0,
        createdAt: new Date()
      });
      alert("Added!");
    });
  };

  return (
    <div>
      <h1>Add Pump</h1>
      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setData({...data,price:e.target.value})}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}