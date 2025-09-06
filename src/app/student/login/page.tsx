"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = `${rollNumber}@school.com`;
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/student/dashboard");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        alert((error as { message: string }).message);
      } else {
        alert("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--primary)' }}>Student Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="form-button"
            style={{ marginBottom: 0 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ fontSize: 14, color: '#888', textAlign: 'center', marginTop: 16 }}>
          Don&apos;t have an account? Contact your teacher.
        </p>
      </div>
    </div>
  );
}
