import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PumpCard from "./PumpCard";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pumps"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPumps(data);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {/* ➕ Add Button */}
      <a href="/add" style={{
        position: "absolute",
        top: 15,
        right: 15,
        background: "#22c55e",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "10px",
        zIndex: 1000,
        textDecoration: "none"
      }}>
        ➕ Add Pump
      </a>

      <MapContainer
        center={[23.6850, 90.3563]} // BD center
        zoom={7}
        minZoom={6}
        maxZoom={18}
        maxBounds={[
          [20.5, 88.0],   // southwest
          [26.5, 92.7]    // northeast
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {pumps.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <PumpCard pump={p} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}
