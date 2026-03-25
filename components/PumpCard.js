import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, updateDoc, increment, collection, addDoc, onSnapshot, query, where } from "firebase/firestore";

export default function PumpCard({ pump }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "comments"), where("pumpId", "==", pump.id));
    const unsub = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, [pump.id]);

  const vote = async (type) => {
    const ref = doc(db, "pumps", pump.id);
    await updateDoc(ref, { [type]: increment(1) });
  };

  const sendComment = async () => {
    await addDoc(collection(db, "comments"), {
      pumpId: pump.id,
      text: comment,
      time: new Date()
    });
    setComment("");
  };

  return (
    <div>
      <h3>{pump.name}</h3>
      <p>{pump.price}</p>

      <button onClick={()=>vote("sotti")}>✅ {pump.sotti || 0}</button>
      <button onClick={()=>vote("mitha")}>❌ {pump.mitha || 0}</button>

      <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="comment"/>
      <button onClick={sendComment}>Send</button>

      {comments.map((c,i)=>(<p key={i}>{c.text}</p>))}
    </div>
  );
}