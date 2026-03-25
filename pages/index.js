import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div style={{ background:"#0f172a", minHeight:"100vh", color:"#fff" }}>

      <div style={{
        padding:"12px",
        background:"#1e293b",
        textAlign:"center",
        fontWeight:"bold"
      }}>
        🚴 Bike Tel Sondhan
      </div>

      <div style={{
        padding:"10px",
        display:"flex",
        justifyContent:"center"
      }}>
        <div style={{
          width:"100%",
          maxWidth:"500px",
          height:"55vh",
          borderRadius:"12px",
          overflow:"hidden"
        }}>
          <MapView />
        </div>
      </div>

    </div>
  );
}
