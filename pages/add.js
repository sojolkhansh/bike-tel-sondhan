import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Add() {
  const [data,setData]=useState({name:"",price:"",city:""});

  const getLocationFromCity = async (city) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city} Bangladesh`
    );
    const result = await res.json();
    return result[0];
  };

  const handleSubmit = async () => {
    const loc = await getLocationFromCity(data.city);

    await addDoc(collection(db,"pumps"),{
      ...data,
      lat:parseFloat(loc.lat),
      lng:parseFloat(loc.lon),
      sotti:0,
      mitha:0,
      createdAt:new Date()
    });

    alert("Added!");
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>Add Pump</h2>

      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setData({...data,price:e.target.value})}/>
      <input placeholder="City" onChange={e=>setData({...data,city:e.target.value})}/>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
