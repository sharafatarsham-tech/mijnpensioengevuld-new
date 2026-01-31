"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (savedPassword) {
          router.push("/admin/dashboard");
        }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Test the password by making a request to the API
      const res = await fetch("/api/leads", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (res.ok) {
        sessionStorage.setItem("adminPassword", password);
        router.push("/admin/dashboard");
      } else {
        setError("Onjuist wachtwoord");
      }
    } catch {
      setError("Er ging iets mis. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Log in om toegang te krijgen</p>
          </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Voer wachtwoord in"
                required
              />
            </div>

            {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50"
            >
            {loading ? "Laden..." : "Inloggen"}
            </button>
          </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          <a href="/" className="text-orange-500 hover:underline">
              ← Terug naar website
          </a>
        </p>
      </div>
    </div>
  );
}
