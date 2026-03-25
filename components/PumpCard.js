import { useState,useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc,updateDoc,increment,
  collection,addDoc,onSnapshot,query,where
} from "firebase/firestore";

export default function PumpCard({pump,userLoc}) {

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
      time:new Date().toLocaleString()
    });

    setComment("");
  };

  const getDistance=(lat1,lon1,lat2,lon2)=>{
    const R=6371;
    const dLat=(lat2-lat1)*Math.PI/180;
    const dLon=(lon2-lon1)*Math.PI/180;

    const a=Math.sin(dLat/2)**2 +
      Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*
      Math.sin(dLon/2)**2;

    return (R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))).toFixed(2);
  };

  return (
    <div style={{minWidth:"230px"}}>

      <h3>{pump.name}</h3>
      <p>💰 {pump.price}</p>
      <p>📍 {pump.city}</p>
      <p>👤 {pump.user}</p>
      <p>🕒 {pump.time}</p>

      {userLoc && (
        <p>📏 {getDistance(userLoc[0],userLoc[1],pump.lat,pump.lng)} km</p>
      )}

      <button onClick={()=>vote("sotti")}>✅ {pump.sotti||0}</button>
      <button onClick={()=>vote("mitha")}>❌ {pump.mitha||0}</button>

      <hr/>

      <input
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        placeholder="comment"
      />
      <button onClick={sendComment}>Send</button>

      {comments.map((c,i)=>(
        <p key={i}>💬 {c.text}</p>
      ))}

    </div>
  );
}
