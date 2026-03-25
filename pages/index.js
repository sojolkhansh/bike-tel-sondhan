import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div style={{ background:"#0f172a", minHeight:"100vh", color:"#fff" }}>

      {/* TOP BAR */}
      <div style={{
        padding:"15px",
        background:"#1e293b",
        display:"flex",
        justifyContent:"space-between"
      }}>
        <h2>🚴 Bike Tel Sondhan</h2>
      </div>

      {/* SMALL MAP BOX */}
      <div style={{
        display:"flex",
        justifyContent:"center",
        padding:"20px"
      }}>
        <div style={{
          width:"90%",
          height:"60vh",
          borderRadius:"15px",
          overflow:"hidden",
          boxShadow:"0 0 20px rgba(0,0,0,0.5)"
        }}>
          <MapView />
        </div>
      </div>

    </div>
  );
}
