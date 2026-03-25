import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      
      {/* 🔥 TOP BAR */}
      <div style={{
        background: "#1e293b",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>🚴 Bike Tel Sondhan</h2>

        <input
          placeholder="Search pump..."
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            width: "220px",
            outline: "none"
          }}
        />
      </div>

      {/* 🔥 MAP BOX */}
      <div style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          width: "95%",
          height: "75vh",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,0,0,0.6)"
        }}>
          <MapView />
        </div>
      </div>

    </div>
  );
}
