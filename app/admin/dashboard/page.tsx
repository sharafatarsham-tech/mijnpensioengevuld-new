"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PiggyIcon } from "@/components/ui/PiggyIcon";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndLoadMessages();
  }, []);

  const checkAuthAndLoadMessages = async () => {
    try {
      const authRes = await fetch("/api/auth");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin");
        return;
      }

      const messagesRes = await fetch("/api/messages");
      if (messagesRes.ok) {
        const data = await messagesRes.json();
        setMessages(data.messages || []);
      }
    } catch {
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  const markAsRead = async (id: string, read: boolean) => {
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });

    setMessages(messages.map((m) => (m.id === id ? { ...m, read } : m)));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, read });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;

    await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PiggyIcon size="sm" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">MijnPensioenGevuld.nl</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-orange-500">
              Bekijk website
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-800">{messages.length}</div>
            <div className="text-slate-600">Totaal berichten</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-orange-500">{unreadCount}</div>
            <div className="text-slate-600">Ongelezen</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-500">{messages.length - unreadCount}</div>
            <div className="text-slate-600">Gelezen</div>
          </div>
        </div>

        {/* Messages */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Berichten</h2>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  Nog geen berichten ontvangen
                </div>
              ) : (
                messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) markAsRead(message.id, true);
                    }}
                    className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${
                      selectedMessage?.id === message.id ? "bg-orange-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!message.read && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                          )}
                          <span className={`font-medium truncate ${!message.read ? "text-slate-800" : "text-slate-600"}`}>
                            {message.name}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 truncate mt-1">{message.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{formatDate(message.createdAt)}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800">Bericht van {selectedMessage.name}</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markAsRead(selectedMessage.id, !selectedMessage.read)}
                      className="text-sm text-slate-600 hover:text-orange-500"
                    >
                      {selectedMessage.read ? "Markeer als ongelezen" : "Markeer als gelezen"}
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{selectedMessage.name}</h3>
                        <p className="text-sm text-slate-500">{formatDate(selectedMessage.createdAt)}</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4">
                      <div>
                        <span className="text-xs font-medium text-slate-500 uppercase">E-mail</span>
                        <a href={`mailto:${selectedMessage.email}`} className="block text-slate-800 hover:text-orange-500">
                          {selectedMessage.email}
                        </a>
                      </div>
                      {selectedMessage.phone && (
                        <div>
                          <span className="text-xs font-medium text-slate-500 uppercase">Telefoon</span>
                          <a href={`tel:${selectedMessage.phone}`} className="block text-slate-800 hover:text-orange-500">
                            {selectedMessage.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase">Bericht</span>
                    <div className="mt-2 bg-slate-50 rounded-xl p-4">
                      <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Uw bericht aan MijnPensioenGevuld.nl`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Beantwoorden via e-mail
                    </a>
                    {selectedMessage.phone && (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="inline-flex items-center gap-2 border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-orange-300 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Bellen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center">
                <div>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Selecteer een bericht</h3>
                  <p className="text-slate-500">Klik op een bericht in de lijst om de details te bekijken</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
