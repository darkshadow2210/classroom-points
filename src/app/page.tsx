"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* App Name */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center neon-text">
        Vikhyath Teaching Points App
      </h1>
      <p className="text-gray-300 text-lg mb-10 text-center max-w-md">
        Manage students’ points with a fun and glowing experience!
      </p>

      {/* Navigation Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center z-20">
        <Link
          href="/student/signup"
          className="neon-card border-pink-500 hover:border-pink-400"
        >
          <h2 className="text-2xl font-semibold text-pink-400 mb-2">Student Signup</h2>
          <p className="text-gray-400 text-sm mb-4">
            Create your account with Roll Number, Name, and Password.
          </p>
          <span className="neon-btn bg-pink-500">Sign Up</span>
        </Link>

        <Link
          href="/student/login"
          className="neon-card border-green-500 hover:border-green-400"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-2">Student Login</h2>
          <p className="text-gray-400 text-sm mb-4">
            Access your dashboard and track your points anytime.
          </p>
          <span className="neon-btn bg-green-500">Login</span>
        </Link>

        <Link
          href="/teacher/login"
          className="neon-card border-blue-500 hover:border-blue-400"
        >
          <h2 className="text-2xl font-semibold text-blue-400 mb-2">Teacher Login</h2>
          <p className="text-gray-400 text-sm mb-4">
            Manage students’ points and view their performance.
          </p>
          <span className="neon-btn bg-blue-500">Login</span>
        </Link>
      </div>

      {/* Neon Glow & Animation Styles */}
      <style jsx>{`
        .neon-card {
          flex: 1;
          border: 2px solid;
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          transition: 0.3s ease;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }
        .neon-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        .neon-btn {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        .neon-btn:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }
        .neon-text {
          color: #fff;
          text-shadow: 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de;
        }
        
      `}</style>
    </div>
  );
}
