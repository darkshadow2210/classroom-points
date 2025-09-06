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
        <h1 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--primary)' }}>Student Signup</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <p style={{ fontSize: 14, color: '#888', textAlign: 'center', marginTop: 16 }}>
          Already have an account?{' '}
          <a href="/student/login" className="link">Login</a>
        </p>
      </div>
    </div>
  );
}
