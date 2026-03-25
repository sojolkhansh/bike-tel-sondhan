import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc, updateDoc, increment,
  collection, addDoc, onSnapshot, query, where
} from "firebase/firestore";

export default function PumpCard({ pump }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 🔴 Real-time comments
  useEffect(() => {
    const q = query(collection(db, "comments"), where("pumpId", "==", pump.id));

    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map(d => d.data()));
    });

    return () => unsub();
  }, [pump.id]);

  // ✅ Vote
  const vote = async (type) => {
    const ref = doc(db, "pumps", pump.id);

    if (type === "sotti") {
      await updateDoc(ref, { sotti: increment(1) });
    } else {
      await updateDoc(ref, { mitha: increment(1) });
    }
  };

  // 💬 Comment
  const sendComment = async () => {
    if (!comment) return;

    await addDoc(collection(db, "comments"), {
      pumpId: pump.id,
      text: comment,
      time: new Date()
    });

    setComment("");
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <h3>{pump.name}</h3>
      <p>💰 {pump.price}</p>

      <button onClick={() => vote("sotti")}>
        ✅ {pump.sotti || 0}
      </button>

      <button onClick={() => vote("mitha")}>
        ❌ {pump.mitha || 0}
      </button>

      <hr />

      <input
        placeholder="comment..."
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />
      <button onClick={sendComment}>Send</button>

      {comments.map((c, i) => (
        <p key={i}>💬 {c.text}</p>
      ))}
    </div>
  );
}
