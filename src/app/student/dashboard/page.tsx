"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [name, setName] = useState("");
  const [vid, setVid] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/student/login");
        return;
      }

      // Real-time listener on student's data
      const docRef = doc(db, "students", user.uid);
      const unsubDoc = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name);
          setVid(data.vid);
          setPoints(data.points);
          setLoading(false);
        }
      });

      return () => unsubDoc();
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/student/login");
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: 20, color: 'var(--primary)', background: 'var(--background)' }}>
        Loading...
      </div>
    );
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: 24 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24, color: 'var(--primary)', textAlign: 'center' }}>
        Welcome, {name}
      </h1>
      <div className="card" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 12 }}>
          Your ID: <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{vid}</span>
        </p>
        <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>
          Points: {points}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="form-button"
        style={{ maxWidth: 400, marginTop: 24 }}
      >
        Logout
      </button>
    </div>
  );
}
