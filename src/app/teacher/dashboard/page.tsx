"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  type Student = {
    id: string;
    vid: string;
    name: string;
    rollNumber: string;
    points: number;
  };
  const [students, setStudents] = useState<Student[]>([]);
  const [vid, setVid] = useState("");
  const [pointsChange, setPointsChange] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // Check if user is a teacher before showing dashboard
  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/teacher/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || userDoc.data().role !== "teacher") {
        router.push("/unauthorized"); // 🚫 Unauthorized page
        return;
      }

      setAuthorized(true);
    };

    checkRole();
  }, [router]);

  // Fetch all students once authorized
  useEffect(() => {
    if (!authorized) return;
    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Student[] = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...(doc.data() as Omit<Student, "id">) }));
      setStudents(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authorized]);

  const handlePointsChange = async () => {
    if (!vid || pointsChange === 0) return alert("Enter valid VID and points");

    const q = query(collection(db, "students"), where("vid", "==", vid));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return setMessage("Student not found");

    const studentDoc = snapshot.docs[0];
    const currentPoints = studentDoc.data().points || 0;
    await updateDoc(studentDoc.ref, { points: currentPoints + pointsChange });
    setMessage("Points updated successfully!");
    setVid("");
    setPointsChange(0);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/teacher/login");
  };


  if (!authorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: 20, color: 'var(--primary)', background: 'var(--background)' }}>
        Checking access...
      </div>
    );
  }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--primary)' }}>Teacher Dashboard</h1>
      <div className="card" style={{ maxWidth: 420, margin: '0 auto 32px auto' }}>
        <input
          type="text"
          placeholder="Student VID"
          value={vid}
          onChange={(e) => setVid(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Points (e.g., 10 or -10)"
          value={pointsChange}
          onChange={(e) => setPointsChange(Number(e.target.value))}
          className="form-input"
        />
        <button
          onClick={handlePointsChange}
          className="form-button"
        >
          Update Points
        </button>
        {message && <p style={{ marginTop: 12, textAlign: 'center', color: 'var(--primary)' }}>{message}</p>}
      </div>
      <div className="card" style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, textAlign: 'center', color: 'var(--primary)' }}>Students List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>VID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.vid}</td>
                <td>{s.name}</td>
                <td>{s.rollNumber}</td>
                <td>{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleLogout}
        className="form-button"
        style={{ maxWidth: 420, margin: '32px auto 0 auto', display: 'block' }}
      >
        Logout
      </button>
    </div>
  );
}
