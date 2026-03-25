import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>🚴 Bike Tel Sondhan</h1>
      <MapView />
    </div>
  );
}