"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDocs, collection, setDoc, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function StudentSignup() {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = `${rollNumber}@school.com`;

      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      const studentsRef = collection(db, "students");
      const allDocs = await getDocs(query(studentsRef));
      const vid = `V${allDocs.size + 1}`;

      await setDoc(doc(db, "students", userCred.user.uid), {
        rollNumber,
        name,
        vid,
        points: 0,
      });

      alert("Signup successful!");
      router.push("/student/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Neon Background Effects */}
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-10 right-10"></div>

      <div className="relative bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-700 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-pink-400 drop-shadow-[0_0_10px_#ec4899]">
          Student Signup
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-pink-300 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-pink-300 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-pink-300 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-pink-500 text-black font-bold hover:bg-pink-400 transition transform hover:scale-105 shadow-[0_0_15px_#ec4899] hover:shadow-[0_0_25px_#ec4899]"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/student/login" className="text-pink-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
