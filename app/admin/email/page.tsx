"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminEmailPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [subscriberCount, setSubscriberCount] = useState(0);
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
    const fetchSubscriberCount = async () => {
      const headers = getAuthHeader();
      if (!headers) return;

      try {
        const res = await fetch("/api/subscribers", { headers });
        if (res.ok) {
          const data = await res.json();
          setSubscriberCount(data.filter((s: any) => s.status === "active").length);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscriberCount();
  }, [router]);

  const sendTestEmail = async () => {
    if (!subject || !content || !testEmail) {
      setResult({ success: false, message: "Vul alle velden in inclusief test email" });
      return;
    }

    const headers = getAuthHeader();
    if (!headers) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, content, testEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: `Test email verzonden naar ${testEmail}` });
      } else {
        setResult({ success: false, message: data.error || "Verzenden mislukt" });
      }
    } catch (err) {
      setResult({ success: false, message: "Er ging iets mis" });
    } finally {
      setSending(false);
    }
  };

  const sendCampaign = async () => {
    if (!subject || !content) {
      setResult({ success: false, message: "Vul onderwerp en inhoud in" });
      return;
    }

    if (!confirm(`Weet je zeker dat je deze email wilt versturen naar ${subscriberCount} subscribers?`)) {
      return;
    }

    const headers = getAuthHeader();
    if (!headers) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `🎉 Campagne verzonden naar ${data.sent} van ${data.total} subscribers`,
        });
        setSubject("");
        setContent("");
      } else {
        setResult({ success: false, message: data.error || "Verzenden mislukt" });
      }
    } catch (err) {
      setResult({ success: false, message: "Er ging iets mis" });
    } finally {
      setSending(false);
    }
  };

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
              <h1 className="text-xl font-bold text-slate-800">Email Campagne</h1>
              <p className="text-sm text-slate-500">{subscriberCount} actieve subscribers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {result && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl ${
              result.success
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {result.message}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Onderwerp
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Bijv: 5 tips voor een beter pensioen"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Inhoud (HTML ondersteund)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent h-64 font-mono text-sm"
                placeholder={`<h2 style="color: #f97316;">Titel hier</h2>

<p>Je bericht hier. Je kunt HTML gebruiken voor opmaak.</p>

<p><strong>Belangrijke punten:</strong></p>
<ul>
  <li>Punt 1</li>
  <li>Punt 2</li>
</ul>

<p>
  <a href="https://mijnpensioengevuld.nl/#contact" style="background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
    Plan gratis gesprek →
  </a>
</p>`}
              />
              <p className="text-xs text-slate-500 mt-2">
                Tip: De email wordt automatisch in een template gewikkeld met header, footer en uitschrijflink.
              </p>
            </div>

            {/* Test Email */}
            <div className="border-t border-slate-200 pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Test Email (optioneel)
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="jouw@email.nl"
                />
                <button
                  onClick={sendTestEmail}
                  disabled={sending}
                  className="bg-slate-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  {sending ? "..." : "Test versturen"}
                </button>
              </div>
            </div>

            {/* Send Campaign */}
            <div className="border-t border-slate-200 pt-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-orange-800">
                  <strong>Let op:</strong> Deze actie stuurt de email naar alle {subscriberCount} actieve subscribers.
                  Test eerst met een test email!
                </p>
              </div>
              <button
                onClick={sendCampaign}
                disabled={sending || subscriberCount === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50"
              >
                {sending ? "Versturen..." : `Verstuur naar ${subscriberCount} subscribers`}
              </button>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Snelle Templates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSubject("💡 5 veelgemaakte pensioenfouten (en hoe je ze voorkomt)");
                setContent(`<h2 style="color: #f97316;">De 5 grootste pensioenfouten</h2>

<p>Veel Nederlanders maken dezelfde fouten als het om hun pensioen gaat. Ken jij ze al?</p>

<ol>
  <li><strong>Te laat beginnen</strong> - Elk jaar dat je wacht kost je geld</li>
  <li><strong>Alleen vertrouwen op AOW</strong> - Die is vaak niet genoeg</li>
  <li><strong>Je pensioenoverzicht niet lezen</strong> - Daar staan verrassingen in</li>
  <li><strong>Geen rekening houden met inflatie</strong> - €1000 nu is niet €1000 later</li>
  <li><strong>Geen persoonlijk advies vragen</strong> - Iedereen is anders</li>
</ol>

<p>Wil je weten hoe jij ervoor staat? Plan een gratis inventarisatiegesprek.</p>

<p style="text-align: center; margin-top: 20px;">
  <a href="https://mijnpensioengevuld.nl/#contact" style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
    Plan gratis gesprek →
  </a>
</p>`);
              }}
              className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-orange-300 transition-colors"
            >
              <p className="font-medium text-slate-800">📧 Pensioenfouten email</p>
              <p className="text-sm text-slate-500">5 veelgemaakte fouten</p>
            </button>

            <button
              onClick={() => {
                setSubject("🎁 Speciale uitnodiging: Gratis pensioen check-up");
                setContent(`<h2 style="color: #f97316;">Exclusieve uitnodiging</h2>

<p>Als bedankje voor je interesse in je pensioen, bieden we je een <strong>gratis pensioen check-up</strong> aan.</p>

<div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <p style="margin: 0;"><strong>Wat krijg je?</strong></p>
  <ul style="margin: 10px 0 0 0; padding-left: 20px;">
    <li>1-1,5 uur persoonlijke aandacht</li>
    <li>Volledige analyse van je pensioensituatie</li>
    <li>Concrete tips en advies op maat</li>
    <li>100% gratis en vrijblijvend</li>
  </ul>
</div>

<p>Er zijn nog maar een paar plekken beschikbaar deze maand.</p>

<p style="text-align: center; margin-top: 20px;">
  <a href="https://mijnpensioengevuld.nl/#contact" style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
    Claim mijn gratis plek →
  </a>
</p>`);
              }}
              className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-orange-300 transition-colors"
            >
              <p className="font-medium text-slate-800">🎁 Uitnodiging email</p>
              <p className="text-sm text-slate-500">Gratis check-up aanbod</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
