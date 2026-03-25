import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PumpCard from "./PumpCard";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [pumps, setPumps] = useState([]);
  const [search,setSearch]=useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pumps"), (snap) => {
      setPumps(snap.docs.map(doc => ({ id:doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // 🔍 filter
  const filtered = pumps.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ height:"100%", width:"100%", position:"relative" }}>

      {/* search */}
      <input
        placeholder="🔍 Search pump..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          position:"absolute",
          top:15,
          left:15,
          zIndex:1000,
          padding:"8px",
          borderRadius:"8px",
          border:"none"
        }}
      />

      {/* add */}
      <a href="/add" style={{
        position:"absolute",
        top:15,
        right:15,
        background:"#22c55e",
        padding:"10px",
        borderRadius:"10px",
        color:"#fff",
        zIndex:1000
      }}>
        ➕ Add
      </a>

      <MapContainer center={[23.6,90.3]} zoom={7} style={{height:"100%"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {filtered.map(p=>(
          <Marker key={p.id} position={[p.lat,p.lng]}>
            <Popup>
              <PumpCard pump={p}/>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
