"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/teacher/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Neon Background Effects */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-10 right-10"></div>

      <div className="relative bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-700 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-400 drop-shadow-[0_0_10px_#a855f7]">
          Teacher Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-500 text-black font-bold hover:bg-purple-400 transition transform hover:scale-105 shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#a855f7]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
      </div>
    </div>
  );
}
