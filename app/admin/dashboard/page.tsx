"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead, Subscriber } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const getAuthHeader = () => {
    const password = sessionStorage.getItem("adminPassword");
    if (!password) {
      router.push("/admin");
      return null;
    }
    return { Authorization: `Bearer ${password}` };
  };

  useEffect(() => {
    const fetchData = async () => {
      const headers = getAuthHeader();
      if (!headers) return;

    try {
        const [leadsRes, subscribersRes] = await Promise.all([
          fetch("/api/leads", { headers }),
          fetch("/api/subscribers", { headers }),
        ]);

        if (!leadsRes.ok || !subscribersRes.ok) {
          if (leadsRes.status === 401) {
            sessionStorage.removeItem("adminPassword");
        router.push("/admin");
        return;
      }
          throw new Error("Failed to fetch data");
        }

        const [leadsData, subscribersData] = await Promise.all([
          leadsRes.json(),
          subscribersRes.json(),
        ]);

        setLeads(leadsData);
        setSubscribers(subscribersData);
      } catch (err) {
        setError("Kon data niet laden. Check je database connectie.");
    } finally {
      setLoading(false);
    }
  };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminPassword");
    router.push("/admin");
  };

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    convertedLeads: leads.filter((l) => l.status === "converted").length,
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter((s) => s.status === "active").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Dashboard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">MijnPensioenGevuld</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-orange-500">
              Bekijk website →
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Totaal Leads"
            value={stats.totalLeads}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Nieuwe Leads"
            value={stats.newLeads}
            icon="✨"
            color="green"
          />
          <StatCard
            title="Geconverteerd"
            value={stats.convertedLeads}
            icon="🎉"
            color="orange"
          />
          <StatCard
            title="Subscribers"
            value={stats.totalSubscribers}
            icon="📧"
            color="purple"
          />
          <StatCard
            title="Actief"
            value={stats.activeSubscribers}
            icon="✅"
            color="teal"
          />
          </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <NavCard
            href="/admin/leads"
            title="Leads Beheer"
            description="Bekijk en beheer alle contactaanvragen"
            icon="👥"
            count={stats.newLeads}
            countLabel="nieuw"
          />
          <NavCard
            href="/admin/subscribers"
            title="Mailinglijst"
            description="Beheer je email subscribers"
            icon="📧"
            count={stats.activeSubscribers}
            countLabel="actief"
          />
          <NavCard
            href="/admin/email"
            title="Email Campagnes"
            description="Stuur emails naar je mailinglijst"
            icon="📨"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Recente Leads</h2>
              <Link href="/admin/leads" className="text-sm text-orange-500 hover:underline">
                Bekijk alle →
              </Link>
            </div>
            {leads.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">Nog geen leads</p>
              ) : (
              <div className="space-y-3">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{lead.name}</p>
                      <p className="text-sm text-slate-500">{lead.email}</p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                ))}
                        </div>
                      )}
                    </div>

          {/* Recent Subscribers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Recente Subscribers</h2>
              <Link href="/admin/subscribers" className="text-sm text-orange-500 hover:underline">
                Bekijk alle →
              </Link>
                  </div>
            {subscribers.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">Nog geen subscribers</p>
            ) : (
              <div className="space-y-3">
                {subscribers.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                  >
                  <div>
                      <p className="font-medium text-slate-800">{sub.email}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(sub.subscribed_at).toLocaleDateString("nl-NL")}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {sub.status === "active" ? "Actief" : "Uitgeschreven"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Google Analytics Link */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Website Analytics</h3>
              <p className="text-sm text-slate-600">Bekijk gedetailleerde statistieken in Google Analytics</p>
            </div>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Open Analytics →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
    purple: "bg-purple-50 border-purple-200",
    teal: "bg-teal-50 border-teal-200",
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-sm text-slate-600">{title}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function NavCard({
  href,
  title,
  description,
  icon,
  count,
  countLabel,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  count?: number;
  countLabel?: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {count !== undefined && (
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
            {count} {countLabel}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    new: { label: "Nieuw", className: "bg-green-100 text-green-700" },
    contacted: { label: "Gecontacteerd", className: "bg-blue-100 text-blue-700" },
    converted: { label: "Geconverteerd", className: "bg-orange-100 text-orange-700" },
    lost: { label: "Verloren", className: "bg-slate-100 text-slate-600" },
  };

  const config = statusConfig[status] || statusConfig.new;

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}
