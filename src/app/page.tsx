"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 16, color: 'var(--primary)' }}>
        Vikhyath Teaching Points App
      </h1>
      <p style={{ color: '#555', fontSize: 20, marginBottom: 40, textAlign: 'center', maxWidth: 500 }}>
        Manage students’ points with a simple, modern, and fun experience!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 900 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/student/signup" className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Student Signup</h2>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 16 }}>
              Create your account with Roll Number, Name, and Password.
            </p>
            <span className="form-button" style={{ background: 'var(--primary)', color: '#fff', width: 'auto', margin: 0 }}>Sign Up</span>
          </Link>
          <Link href="/student/login" className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Student Login</h2>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 16 }}>
              Access your dashboard and track your points anytime.
            </p>
            <span className="form-button" style={{ background: 'var(--primary)', color: '#fff', width: 'auto', margin: 0 }}>Login</span>
          </Link>
          <Link href="/teacher/login" className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Teacher Login</h2>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 16 }}>
              Manage students’ points and view their performance.
            </p>
            <span className="form-button" style={{ background: 'var(--primary)', color: '#fff', width: 'auto', margin: 0 }}>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
