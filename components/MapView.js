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
    <MapContainer center={[23.6, 90.3]} zoom={7} style={{ height: "80vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pumps.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <PumpCard pump={p} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}