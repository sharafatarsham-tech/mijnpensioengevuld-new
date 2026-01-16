"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead } from "@/lib/supabase";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();

  const getAuthHeader = () => {
    const password = sessionStorage.getItem("adminPassword");
    if (!password) {
      router.push("/admin");
      return null;
    }
    return { Authorization: `Bearer ${password}` };
  };

  const fetchLeads = async () => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      const res = await fetch("/api/leads", { headers });
      if (res.status === 401) {
        sessionStorage.removeItem("adminPassword");
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [router]);

  const updateLeadStatus = async (id: string, status: string) => {
    const headers = getAuthHeader();
    if (!headers) return;

    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter((l) => l.status === filter);

  const exportCSV = () => {
    const csv = [
      ["Naam", "Email", "Telefoon", "Bericht", "Status", "Datum"].join(","),
      ...filteredLeads.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.phone || "",
          `"${(lead.message || "").replace(/"/g, '""')}"`,
          lead.status,
          new Date(lead.created_at).toLocaleDateString("nl-NL"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-slate-800">Leads Beheer</h1>
              <p className="text-sm text-slate-500">{leads.length} totaal</p>
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
          >
            Exporteer CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: "all", label: "Alle" },
            { value: "new", label: "Nieuw" },
            { value: "contacted", label: "Gecontacteerd" },
            { value: "converted", label: "Geconverteerd" },
            { value: "lost", label: "Verloren" },
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
              <span className="ml-2 text-sm opacity-70">
                ({item.value === "all" ? leads.length : leads.filter((l) => l.status === item.value).length})
              </span>
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500">Geen leads gevonden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Naam</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Bericht</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${lead.email}`} className="text-orange-500 hover:underline block">
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="text-slate-500 text-sm hover:underline">
                            {lead.phone}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 max-w-xs truncate">
                          {lead.message || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="new">Nieuw</option>
                          <option value="contacted">Gecontacteerd</option>
                          <option value="converted">Geconverteerd</option>
                          <option value="lost">Verloren</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(lead.created_at).toLocaleDateString("nl-NL", {
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
