import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div style={{ background:"#0f172a", minHeight:"100vh", color:"#fff" }}>
      
      {/* TOP BAR */}
      <div style={{
        background:"#1e293b",
        padding:"15px 20px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <h2>🚴 Bike Tel Sondhan</h2>
      </div>

      {/* MAP CARD */}
      <div style={{ display:"flex", justifyContent:"center", padding:"20px" }}>
        <div style={{
          width:"95%",
          height:"70vh",
          borderRadius:"15px",
          overflow:"hidden",
          boxShadow:"0 0 25px rgba(0,0,0,0.6)"
        }}>
          <MapView />
        </div>
      </div>

    </div>
  );
}
