import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PumpCard from "./PumpCard";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pumps"), (snap) => {
      setPumps(snap.docs.map(doc => ({ id:doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ height:"100%", width:"100%", position:"relative" }}>

      <a href="/add" style={{
        position:"absolute",
        top:10,
        right:10,
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

        {pumps.map(p=>(
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
