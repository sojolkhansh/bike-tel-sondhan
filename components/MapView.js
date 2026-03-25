import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PumpCard from "./PumpCard";

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
    <>
      {/* 🔥 ADD BUTTON */}
      <a href="/add" style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "green",
        color: "#fff",
        padding: "10px",
        borderRadius: "10px",
        zIndex: 1000
      }}>
        ➕ Add Pump
      </a>

      <MapContainer center={[23.6, 90.3]} zoom={7} style={{ height: "90vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {pumps.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <PumpCard pump={p} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
