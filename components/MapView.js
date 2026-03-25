import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PumpCard from "./PumpCard";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [pumps,setPumps]=useState([]);
  const [search,setSearch]=useState("");
  const [userLoc,setUserLoc]=useState(null);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
      setUserLoc([pos.coords.latitude,pos.coords.longitude]);
    });
  },[]);

  useEffect(()=>{
    const unsub=onSnapshot(collection(db,"pumps"),(snap)=>{
      setPumps(snap.docs.map(doc=>({id:doc.id,...doc.data()})));
    });
    return ()=>unsub();
  },[]);

  const filtered=pumps.filter(p=>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{height:"100%",position:"relative"}}>

      <input
        placeholder="🔍 Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          position:"absolute",
          top:10,
          left:10,
          zIndex:1000,
          padding:"8px",
          borderRadius:"8px",
          border:"none"
        }}
      />

      <a href="/add" style={{
        position:"absolute",
        top:10,
        right:10,
        background:"#22c55e",
        padding:"8px",
        borderRadius:"8px",
        color:"#fff",
        zIndex:1000
      }}>
        ➕
      </a>

      <MapContainer center={userLoc||[23.6,90.3]} zoom={10} style={{height:"100%"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {userLoc && (
          <Marker position={userLoc}>
            <Popup>📍 You are here</Popup>
          </Marker>
        )}

        {filtered.map(p=>(
          <Marker key={p.id} position={[p.lat,p.lng]}>
            <Popup>
              <PumpCard pump={p} userLoc={userLoc}/>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
