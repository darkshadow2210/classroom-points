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

  if (!authorized) return <p className="text-center mt-10">Checking access...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Teacher Dashboard</h1>

      {/* Update Points */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Student VID"
          value={vid}
          onChange={(e) => setVid(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-3"
        />
        <input
          type="number"
          placeholder="Points (e.g., 10 or -10)"
          value={pointsChange}
          onChange={(e) => setPointsChange(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-700 text-white mb-3"
        />
        <button
          onClick={handlePointsChange}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Update Points
        </button>
        {message && <p className="mt-3 text-center text-green-400">{message}</p>}
      </div>

      {/* Students Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Students List</h2>
        <table className="w-full border border-gray-700 text-center">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 border">VID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">{s.vid}</td>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.rollNumber}</td>
                <td className="border p-2">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleLogout} className="mt-6 w-full max-w-md bg-red-600 hover:bg-red-700 py-2 rounded mx-auto block">
        Logout
      </button>
    </div>
  );
}
