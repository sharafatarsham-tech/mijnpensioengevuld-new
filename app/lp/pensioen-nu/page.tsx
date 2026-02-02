"use client";

import { useRef } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";

// Design Tokens
const colors = {
  background: "#09090B",
  foreground: "#FAFAFA",
  muted: "#27272A",
  mutedForeground: "#A1A1AA",
  accent: "#DFE104",
  accentForeground: "#000000",
  border: "#3F3F46",
};

export default function KineticLandingPage() {
  return (
    <main 
      className="min-h-screen overflow-x-hidden"
      style={{ 
        backgroundColor: colors.background,
        fontFamily: "var(--font-space-grotesk), var(--font-lexend), sans-serif"
      }}
    >
      {/* Noise Texture Overlay */}
      <NoiseOverlay />
      
      {/* Navigation */}
      <KineticNav />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Marquee */}
      <StatsMarquee />
      
      {/* Problems Section */}
      <ProblemsSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Testimonials Marquee */}
      <TestimonialsMarquee />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <KineticFooter />
    </main>
  );
}

function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function KineticNav() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-40 border-b-2"
      style={{ 
        backgroundColor: colors.background,
        borderColor: colors.border 
      }}
    >
      <div className="max-w-[95vw] mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/"
          className="text-lg font-bold uppercase tracking-tighter transition-colors hover:text-[#DFE104]"
          style={{ color: colors.foreground }}
        >
          MPG
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/#calculator"
            className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#DFE104]"
            style={{ color: colors.mutedForeground }}
          >
            Calculator
          </Link>
          <Link 
            href="/#contact"
            className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#DFE104]"
            style={{ color: colors.mutedForeground }}
          >
            Contact
          </Link>
          <Link
            href="#actie"
            className="h-10 px-6 font-bold uppercase tracking-tighter flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.accentForeground,
            }}
          >
            START NU
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <motion.div 
        className="max-w-[95vw] mx-auto px-4 py-32 text-center relative z-10"
        style={{ scale, opacity }}
      >
        {/* Small Label */}
        <p 
          className="text-xs md:text-sm lg:text-lg font-medium uppercase tracking-widest mb-8"
          style={{ color: colors.mutedForeground }}
        >
          Pensioenadvies voor mensen die weten wat ze willen
        </p>
        
        {/* Massive Headline */}
        <h1 
          className="font-bold uppercase leading-[0.85] tracking-tighter mb-8"
          style={{ 
            color: colors.foreground,
            fontSize: "clamp(3rem, 12vw, 14rem)",
          }}
        >
          STOP MET<br />
          <span style={{ color: colors.accent }}>TWIJFELEN</span>
        </h1>
        
        {/* Subheadline */}
        <p 
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12"
          style={{ color: colors.mutedForeground }}
        >
          Je weet dat je iets moet doen aan je pensioen. Maar je stelt uit. 
          Wij maken het simpel. Eén gesprek. Duidelijke antwoorden.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#actie"
            className="h-14 lg:h-20 px-8 lg:px-12 font-bold uppercase tracking-tighter flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-base lg:text-lg"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.accentForeground,
            }}
          >
            PLAN GRATIS GESPREK →
          </Link>
          <Link
            href="/#calculator"
            className="h-14 lg:h-20 px-8 lg:px-12 font-bold uppercase tracking-tighter flex items-center justify-center border-2 transition-all hover:bg-[#FAFAFA] hover:text-[#09090B]"
            style={{ 
              borderColor: colors.border,
              color: colors.foreground,
            }}
          >
            BEREKEN JE GAT
          </Link>
        </div>

        {/* Background decorative number */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold -z-10 select-none pointer-events-none"
          style={{ 
            color: colors.muted,
            fontSize: "clamp(8rem, 40vw, 40rem)",
            opacity: 0.3,
          }}
        >
          67
        </div>
      </motion.div>
    </section>
  );
}

function StatsMarquee() {
  const stats = [
    { value: "225+", label: "KLANTEN" },
    { value: "€100K", label: "MAX BESPARING" },
    { value: "15+", label: "JAAR ERVARING" },
    { value: "40+", label: "AANBIEDERS" },
    { value: "4.9★", label: "GOOGLE REVIEWS" },
    { value: "100%", label: "ONAFHANKELIJK" },
  ];

  return (
    <section 
      className="py-8 border-y-2"
      style={{ 
        backgroundColor: colors.accent,
        borderColor: colors.accentForeground,
      }}
    >
      <Marquee speed={80} gradient={false} autoFill>
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 mx-8">
            <span 
              className="text-[6rem] md:text-[8rem] font-bold tracking-tighter leading-none"
              style={{ color: colors.accentForeground }}
            >
              {stat.value}
            </span>
            <span 
              className="text-lg md:text-xl uppercase tracking-widest font-medium"
              style={{ color: colors.accentForeground, opacity: 0.7 }}
            >
              {stat.label}
            </span>
            <span 
              className="text-4xl mx-4"
              style={{ color: colors.accentForeground, opacity: 0.3 }}
            >
              ◆
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

function ProblemsSection() {
  const problems = [
    {
      number: "01",
      title: "JE WEET NIET HOEVEEL JE NODIG HEBT",
      description: "Pensioenoverzichten zijn onleesbaar. Wij vertalen het naar wat het écht betekent voor jouw toekomst.",
    },
    {
      number: "02", 
      title: "JE STELT UIT OMDAT HET COMPLEX LIJKT",
      description: "Het hoeft niet moeilijk te zijn. Na één gesprek weet je precies waar je staat.",
    },
    {
      number: "03",
      title: "JE BETAALT TE VEEL BELASTING",
      description: "Slimme pensioenopbouw = legaal belasting besparen. Wij laten je zien hoe.",
    },
  ];

  return (
    <section className="py-32" style={{ backgroundColor: colors.background }}>
      <div className="max-w-[95vw] mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20">
          <p 
            className="text-xs md:text-sm uppercase tracking-widest mb-4"
            style={{ color: colors.accent }}
          >
            Herkenbaar?
          </p>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none"
            style={{ color: colors.foreground }}
          >
            HET PROBLEEM
          </h2>
        </div>

        {/* Problem Cards - Sticky Scroll */}
        <div className="space-y-4">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="sticky top-32 border-2 p-8 md:p-12 group cursor-default transition-colors duration-300 hover:bg-[#DFE104] hover:border-[#DFE104]"
              style={{ 
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Number */}
                <span 
                  className="text-[6rem] md:text-[8rem] font-bold tracking-tighter leading-none transition-colors duration-300 group-hover:text-black"
                  style={{ color: colors.muted }}
                >
                  {problem.number}
                </span>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 
                    className="text-2xl md:text-3xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight mb-4 transition-all duration-300 group-hover:text-black group-hover:translate-x-4"
                    style={{ color: colors.foreground }}
                  >
                    {problem.title}
                  </h3>
                  <p 
                    className="text-lg md:text-xl lg:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: colors.accentForeground }}
                  >
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "AANVRAGEN",
      description: "Vul het formulier in. Kost 30 seconden.",
    },
    {
      step: "02",
      title: "GESPREK",
      description: "We bellen of videobellen op een moment dat jou uitkomt.",
    },
    {
      step: "03",
      title: "DUIDELIJKHEID",
      description: "Je weet exact waar je staat en wat je opties zijn.",
    },
  ];

  return (
    <section className="py-32 border-t-2" style={{ borderColor: colors.border }}>
      <div className="max-w-[95vw] mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p 
            className="text-xs md:text-sm uppercase tracking-widest mb-4"
            style={{ color: colors.accent }}
          >
            Zo werkt het
          </p>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none"
            style={{ color: colors.foreground }}
          >
            3 STAPPEN
          </h2>
        </div>

        {/* Steps Grid */}
        <div 
          className="grid md:grid-cols-3 gap-px"
          style={{ backgroundColor: colors.border }}
        >
          {steps.map((step, i) => (
            <div 
              key={i}
              className="p-8 md:p-12 group cursor-default transition-colors duration-300 hover:bg-[#DFE104]"
              style={{ backgroundColor: colors.background }}
            >
              <span 
                className="text-[8rem] md:text-[10rem] font-bold tracking-tighter leading-none block mb-4 transition-colors duration-300 group-hover:text-black"
                style={{ color: colors.muted }}
              >
                {step.step}
              </span>
              <h3 
                className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-4 transition-colors duration-300 group-hover:text-black"
                style={{ color: colors.foreground }}
              >
                {step.title}
              </h3>
              <p 
                className="text-lg transition-colors duration-300 group-hover:text-black"
                style={{ color: colors.mutedForeground }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsMarquee() {
  const testimonials = [
    {
      quote: "Eindelijk duidelijkheid over mijn pensioen. Ik weet nu precies waar ik sta.",
      author: "Peter, 54",
    },
    {
      quote: "Het gesprek was relaxed en helder. Geen vakjargon, gewoon eerlijk advies.",
      author: "Marieke, 47",
    },
    {
      quote: "€12.000 belastingvoordeel per jaar. Dat had ik nooit zelf ontdekt.",
      author: "Jan, 62",
    },
    {
      quote: "Als ZZP'er had ik geen idee. Nu bouw ik eindelijk pensioen op.",
      author: "Lisa, 38",
    },
  ];

  return (
    <section className="py-16 border-y-2" style={{ borderColor: colors.border }}>
      <Marquee speed={40} gradient={false} autoFill>
        {testimonials.map((testimonial, i) => (
          <div 
            key={i}
            className="mx-4 p-8 border-2 w-[400px] md:w-[500px]"
            style={{ 
              borderColor: colors.border,
              backgroundColor: colors.background,
            }}
          >
            <p 
              className="text-lg md:text-xl lg:text-2xl mb-6 leading-tight"
              style={{ color: colors.foreground }}
            >
              "{testimonial.quote}"
            </p>
            <p 
              className="text-sm uppercase tracking-widest"
              style={{ color: colors.mutedForeground }}
            >
              — {testimonial.author}
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

function CTASection() {
  return (
    <section 
      id="actie"
      className="py-32"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-[95vw] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none text-center mb-12"
            style={{ color: colors.foreground }}
          >
            KLAAR VOOR<br />
            <span style={{ color: colors.accent }}>ACTIE?</span>
          </h2>

          {/* Form */}
          <form className="space-y-8">
            <div>
              <input
                type="text"
                name="name"
                placeholder="NAAM"
                required
                className="w-full h-24 border-b-2 bg-transparent text-4xl font-bold uppercase tracking-tighter focus:outline-none transition-colors focus:border-[#DFE104]"
                style={{ 
                  borderColor: colors.border,
                  color: colors.foreground,
                }}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-MAIL"
                required
                className="w-full h-24 border-b-2 bg-transparent text-4xl font-bold uppercase tracking-tighter focus:outline-none transition-colors focus:border-[#DFE104]"
                style={{ 
                  borderColor: colors.border,
                  color: colors.foreground,
                }}
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="TELEFOON"
                required
                className="w-full h-24 border-b-2 bg-transparent text-4xl font-bold uppercase tracking-tighter focus:outline-none transition-colors focus:border-[#DFE104]"
                style={{ 
                  borderColor: colors.border,
                  color: colors.foreground,
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full h-20 font-bold uppercase tracking-tighter text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mt-12"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.accentForeground,
              }}
            >
              VRAAG GRATIS GESPREK AAN →
            </button>
          </form>

          {/* Trust Elements */}
          <div 
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-widest"
            style={{ color: colors.mutedForeground }}
          >
            <span>✓ 100% GRATIS</span>
            <span>✓ GEEN VERPLICHTINGEN</span>
            <span>✓ BINNEN 24U REACTIE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function KineticFooter() {
  return (
    <footer 
      className="py-16 border-t-2"
      style={{ 
        backgroundColor: colors.accent,
        borderColor: colors.accentForeground,
      }}
    >
      <div className="max-w-[95vw] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link 
            href="/"
            className="text-2xl font-bold uppercase tracking-tighter"
            style={{ color: colors.accentForeground }}
          >
            MIJNPENSIOENGEVULD
          </Link>

          {/* Links */}
          <div 
            className="flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-wide"
            style={{ color: colors.accentForeground }}
          >
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/voorwaarden" className="hover:underline">Voorwaarden</Link>
            <Link href="/klachten" className="hover:underline">Klachten</Link>
          </div>

          {/* AFM */}
          <p 
            className="text-sm uppercase tracking-wide"
            style={{ color: colors.accentForeground, opacity: 0.7 }}
          >
            AFM-geregistreerd • Nr. {siteConfig.compliance.afmNumber}
          </p>
        </div>

        {/* Bottom Tagline */}
        <p 
          className="text-center mt-12 text-lg md:text-xl uppercase tracking-widest"
          style={{ color: colors.accentForeground, opacity: 0.5 }}
        >
          Stop met twijfelen. Start met bouwen.
        </p>
      </div>
    </footer>
  );
}
