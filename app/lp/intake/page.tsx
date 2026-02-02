"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function IntakeLandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* CTA Banner */}
      <CTABanner />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <nav className="bg-[#1e3a5f] py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/fz-logo-v2.png"
            alt="MijnPensioenGevuld"
            width={180}
            height={40}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/over-ons" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            Waarom wij
          </Link>
          <Link href="/dienstenwijzer" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            Onze aanpak
          </Link>
          <Link href="/#contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#intake-form"
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          Plan gratis intake
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#f0f7ff] to-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1e3a5f] leading-tight mb-6">
            Krijg rust en helderheid over je pensioen
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Wij brengen al je pensioenregelingen in kaart en geven je onafhankelijk advies. Zonder verplichtingen, zonder verkooppraat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="#intake-form"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
            >
              Plan gratis intake
            </Link>
            <span className="text-gray-500 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Vrijblijvend gesprek
            </span>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              100% onafhankelijk
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Reactie binnen 24 uur
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              225+ tevreden klanten
            </span>
          </div>
        </div>

        {/* Right Content - Feature Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#e8f5e9] rounded-xl flex items-center justify-center">
              <Image
                src="/pig.only.png"
                alt="Pensioen"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f]">Volledig pensioenoverzicht</h3>
              <p className="text-gray-500 text-sm">in één helder gesprek</p>
            </div>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-700">Al je pensioenregelingen op een rij</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-700">Inzicht in je pensioentekort</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-700">Persoonlijk advies op maat</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: "Gratis intake aanvraag",
          message: formData.message || "Ik wil graag een gratis intake plannen.",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="intake-form" className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Bedankt voor je aanvraag!</h2>
          <p className="text-gray-600 mb-8">We nemen binnen 24 uur contact met je op om een afspraak in te plannen.</p>
          <Link href="/" className="text-[#22c55e] font-semibold hover:underline">
            ← Terug naar homepage
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="intake-form" className="py-20 px-6 bg-gray-50">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            Stel je vraag of plan een gratis intake
          </h2>
          <p className="text-gray-600">
            Vul het formulier in en we nemen binnen 24 uur contact met je op
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voornaam</label>
              <input
                type="text"
                placeholder="Bijv. Jan"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achternaam</label>
              <input
                type="text"
                placeholder="Bijv. Jansen"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
            <input
              type="email"
              placeholder="jan@voorbeeld.nl"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefoonnummer</label>
            <input
              type="tel"
              placeholder="06 12345678"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Waar kunnen we je mee helpen?</label>
            <textarea
              rows={4}
              placeholder="Vertel ons kort waar je tegenaanloopt of wat je wilt weten over je pensioen..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors text-lg"
          >
            {isSubmitting ? "Versturen..." : "Verstuur aanvraag"}
          </button>

          {/* Trust line */}
          <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            MijnGevuld • Persoonlijk • Binnen 24 uur reactie
          </p>
        </form>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Volledig pensioenoverzicht",
      description: "We brengen al je pensioenregelingen in kaart: AOW, werkgeverspensioen, en eigen opbouw.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Onafhankelijk advies",
      description: "Wij zijn niet gebonden aan een verzekeraar. Jouw belang staat voorop, altijd.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "Geen verkoopdruk",
      description: "Je krijgt advies, geen verkooppraatje. Beslis zelf wat je met de informatie doet.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Rust en duidelijkheid",
      description: "Na het gesprek weet je precies waar je staat en wat je opties zijn.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            Waarom een gratis intakegesprek?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            In 30 minuten krijg je volledige helderheid over je pensioensituatie
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-[#f0f7ff] rounded-2xl flex items-center justify-center mx-auto mb-5">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Aanvraag",
      description: "Vul het formulier in met je gegevens en vraag. We nemen binnen 24 uur contact op.",
    },
    {
      number: "2",
      title: "Intakegesprek",
      description: "In een gratis gesprek van 30 minuten brengen we je pensioensituatie volledig in kaart.",
    },
    {
      number: "3",
      title: "Persoonlijk advies",
      description: "Je krijgt een helder overzicht en advies op maat. Jij bepaalt de vervolgstappen.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            Zo werkt het
          </h2>
          <p className="text-gray-600">
            In drie simpele stappen naar een helder pensioenoverzicht
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-[#1e3a5f]/10 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-16 px-6 bg-[#1e3a5f]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Krijg helderheid over je pensioen
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Plan vandaag nog een gratis intakegesprek en weet binnen 30 minuten precies waar je staat
        </p>
        <Link
          href="#intake-form"
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-full font-semibold transition-colors inline-block"
        >
          Plan gratis intake
        </Link>
        <p className="text-white/60 text-sm mt-6 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          MijnGevuld • Persoonlijk • Binnen 24 uur reactie
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Peter van Dijk",
      role: "Klant",
      rating: 5,
      quote: "Eindelijk overzicht! Ik had geen idee wat ik kon verwachten met pensioen. Nu wel.",
    },
    {
      name: "Linda Bakker",
      role: "Klant",
      rating: 5,
      quote: "Geen verkooppraat, gewoon helder advies. Precies wat je zoekt.",
    },
    {
      name: "Mark Hendriks",
      role: "Klant",
      rating: 5,
      quote: "Binnen een week had ik alles in orde. Ik nodig het. Top service!",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            Wat klanten zeggen
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a5f]">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/fz-logo-v2.png"
                alt="MijnPensioenGevuld"
                width={160}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Onafhankelijk pensioenadvies. Helder en op maat.
            </p>
          </div>

          {/* Column 2 - Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.contact.phone}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteConfig.contact.email}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteConfig.contact.address.city}, Nederland
              </li>
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigatie</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
              <li><Link href="/dienstenwijzer" className="hover:text-white transition-colors">Onze aanpak</Link></li>
              <li><Link href="#intake-form" className="hover:text-white transition-colors">Plan intake</Link></li>
              <li><Link href="/kennisbank" className="hover:text-white transition-colors">Kennisbank</Link></li>
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <h4 className="font-bold mb-4">Juridisch</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacyverklaring</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-white transition-colors">Algemene voorwaarden</Link></li>
              <li><Link href="/klachten" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>© 2024 MijnPensioenGevuld.nl. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
