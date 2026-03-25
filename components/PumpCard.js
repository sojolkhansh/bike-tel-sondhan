import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc, updateDoc, increment,
  collection, addDoc, onSnapshot, query, where
} from "firebase/firestore";

export default function PumpCard({ pump }) {
  const [comment,setComment]=useState("");
  const [comments,setComments]=useState([]);

  useEffect(()=>{
    const q=query(collection(db,"comments"),where("pumpId","==",pump.id));
    const unsub=onSnapshot(q,(snap)=>{
      setComments(snap.docs.map(d=>d.data()));
    });
    return ()=>unsub();
  },[pump.id]);

  const vote=async(type)=>{
    const ref=doc(db,"pumps",pump.id);
    await updateDoc(ref,{[type]:increment(1)});
  };

  const sendComment=async()=>{
    if(!comment) return;
    await addDoc(collection(db,"comments"),{
      pumpId:pump.id,
      text:comment,
      time:new Date()
    });
    setComment("");
  };

  return (
    <div style={{
      minWidth:"230px",
      background:"#1e293b",
      padding:"12px",
      borderRadius:"12px"
    }}>

      <h3>{pump.name}</h3>
      <p>💰 {pump.price}</p>

      <div style={{display:"flex",gap:"10px"}}>
        <button style={green} onClick={()=>vote("sotti")}>
          ✅ {pump.sotti||0}
        </button>

        <button style={red} onClick={()=>vote("mitha")}>
          ❌ {pump.mitha||0}
        </button>
      </div>

      <hr/>

      <input
        value={comment}
        onChange={e=>setComment(e.target.value)}
        placeholder="Write comment..."
        style={input}
      />

      <button onClick={sendComment} style={send}>
        Send
      </button>

      {comments.map((c,i)=>(
        <div key={i} style={commentBox}>
          💬 {c.text}
        </div>
      ))}

    </div>
  );
}

const green={background:"#22c55e",border:"none",padding:"5px",color:"#fff",borderRadius:"6px"};
const red={background:"#ef4444",border:"none",padding:"5px",color:"#fff",borderRadius:"6px"};
const input={width:"100%",padding:"6px",marginTop:"5px",borderRadius:"6px",border:"none"};
const send={marginTop:"5px",background:"#38bdf8",border:"none",padding:"6px",color:"#fff",borderRadius:"6px"};
const commentBox={background:"#0f172a",padding:"5px",marginTop:"5px",borderRadius:"5px"};
