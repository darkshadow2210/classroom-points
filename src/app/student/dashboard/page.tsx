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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-70"></div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 z-10 neon-text">
        Welcome, {name}
      </h1>

      {/* Neon Card */}
      <div className="z-10 bg-white/5 border border-pink-500 rounded-2xl p-6 w-full max-w-md text-center shadow-neon">
        <p className="text-lg mb-4">
          Your ID: <span className="font-bold text-pink-400">{vid}</span>
        </p>
        <p className="text-xl font-bold text-green-400 neon-points animate-pulse">
          Points: {points}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="z-10 mt-6 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white font-semibold shadow-lg hover:shadow-red-500 transition"
      >
        Logout
      </button>

      {/* Styles */}
      <style jsx>{`
        .shadow-neon {
          box-shadow: 0 0 15px rgba(255, 0, 150, 0.7),
            0 0 25px rgba(0, 255, 255, 0.4);
        }
        .neon-text {
          text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
        }
        .neon-points {
          text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;
        }
      `}</style>
    </div>
  );
}
