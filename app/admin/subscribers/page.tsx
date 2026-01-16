"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Subscriber } from "@/lib/supabase";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("active");
  const router = useRouter();

  const getAuthHeader = () => {
    const password = sessionStorage.getItem("adminPassword");
    if (!password) {
      router.push("/admin");
      return null;
    }
    return { Authorization: `Bearer ${password}` };
  };

  const fetchSubscribers = async () => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const res = await fetch("/api/subscribers", { headers });
      if (res.status === 401) {
        sessionStorage.removeItem("adminPassword");
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [router]);

  const filteredSubscribers =
    filter === "all"
      ? subscribers
      : subscribers.filter((s) => s.status === filter);

  const exportCSV = () => {
    const csv = [
      ["Email", "Naam", "Status", "Aangemeld op"].join(","),
      ...filteredSubscribers.map((sub) =>
        [
          sub.email,
          sub.name || "",
          sub.status,
          new Date(sub.subscribed_at).toLocaleDateString("nl-NL"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const unsubscribedCount = subscribers.filter((s) => s.status === "unsubscribed").length;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Mailinglijst</h1>
              <p className="text-sm text-slate-500">{activeCount} actieve subscribers</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/email"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Email versturen
            </Link>
            <button
              onClick={exportCSV}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
            >
              Exporteer CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-600">Totaal</p>
            <p className="text-2xl font-bold text-slate-800">{subscribers.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4">
            <p className="text-sm text-green-600">Actief</p>
            <p className="text-2xl font-bold text-green-700">{activeCount}</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-600">Uitgeschreven</p>
            <p className="text-2xl font-bold text-slate-500">{unsubscribedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {[
            { value: "active", label: "Actief" },
            { value: "unsubscribed", label: "Uitgeschreven" },
            { value: "all", label: "Alle" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === item.value
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {filteredSubscribers.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500">Geen subscribers gevonden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Naam</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Aangemeld</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <a href={`mailto:${sub.email}`} className="text-orange-500 hover:underline">
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{sub.name || "-"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            sub.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {sub.status === "active" ? "Actief" : "Uitgeschreven"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(sub.subscribed_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
