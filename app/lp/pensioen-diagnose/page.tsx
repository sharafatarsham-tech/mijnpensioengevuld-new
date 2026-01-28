"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

// Types
interface Question {
  id: string;
  question: string;
  subtext?: string;
  type: "single" | "multiple" | "open";
  options?: { value: string; label: string; score: number }[];
  placeholder?: string;
}

interface Answer {
  questionId: string;
  value: string | string[];
  score: number;
}

// Questions designed to create awareness, not give advice
const questions: Question[] = [
  {
    id: "situation",
    question: "Hoe ziet jouw werksituatie er op dit moment uit?",
    subtext: "Dit helpt ons begrijpen welke pensioenvormen voor jou relevant kunnen zijn.",
    type: "single",
    options: [
      { value: "employee", label: "Ik ben in loondienst", score: 0 },
      { value: "zzp", label: "Ik ben zelfstandige (ZZP'er)", score: 2 },
      { value: "dga", label: "Ik heb een eigen BV (DGA)", score: 2 },
      { value: "mixed", label: "Een combinatie van bovenstaande", score: 3 },
    ],
  },
  {
    id: "overview",
    question: "Heb je een compleet overzicht van al je pensioenvoorzieningen?",
    subtext: "Denk aan werkgeverspensioen, AOW, lijfrente, spaargeld, beleggingen.",
    type: "single",
    options: [
      { value: "yes", label: "Ja, ik weet precies wat ik heb opgebouwd", score: 0 },
      { value: "partial", label: "Gedeeltelijk, maar niet alles is duidelijk", score: 2 },
      { value: "no", label: "Nee, ik heb geen totaaloverzicht", score: 3 },
      { value: "unknown", label: "Ik zou het eerlijk gezegd niet weten", score: 3 },
    ],
  },
  {
    id: "enough",
    question: "Weet je of wat je nu opbouwt straks voldoende is?",
    subtext: "Kun je je huidige levensstandaard behouden na je pensioen?",
    type: "single",
    options: [
      { value: "yes", label: "Ja, ik heb dit laten doorrekenen", score: 0 },
      { value: "think_so", label: "Ik denk het wel, maar ik weet het niet zeker", score: 2 },
      { value: "doubt", label: "Ik twijfel of het genoeg zal zijn", score: 3 },
      { value: "no_idea", label: "Ik heb hier eerlijk gezegd geen idee van", score: 3 },
    ],
  },
  {
    id: "last_check",
    question: "Wanneer heb je voor het laatst naar je pensioensituatie gekeken?",
    subtext: "Een actueel beeld is essentieel voor goede beslissingen.",
    type: "single",
    options: [
      { value: "recent", label: "Afgelopen 6 maanden", score: 0 },
      { value: "year", label: "Ongeveer een jaar geleden", score: 1 },
      { value: "years", label: "Meer dan 2 jaar geleden", score: 2 },
      { value: "never", label: "Eigenlijk nooit goed bekeken", score: 3 },
    ],
  },
  {
    id: "risk",
    question: "Wat gebeurt er met jouw situatie als je de komende jaren niets verandert?",
    subtext: "Stel dat alles blijft zoals het nu is tot aan je pensioen.",
    type: "single",
    options: [
      { value: "fine", label: "Dan komt het waarschijnlijk goed", score: 0 },
      { value: "uncertain", label: "Dat weet ik eigenlijk niet", score: 2 },
      { value: "problem", label: "Dan zou er een probleem kunnen ontstaan", score: 3 },
      { value: "serious", label: "Dan maak ik me serieus zorgen", score: 3 },
    ],
  },
  {
    id: "scattered",
    question: "Hoe zou je jouw pensioenvoorzieningen omschrijven?",
    subtext: "Denk aan de samenhang tussen verschillende potjes en regelingen.",
    type: "single",
    options: [
      { value: "organized", label: "Alles is georganiseerd en past bij elkaar", score: 0 },
      { value: "somewhat", label: "Redelijk, maar kan beter gestroomlijnd", score: 1 },
      { value: "scattered", label: "Verschillende losse potjes zonder duidelijk plan", score: 2 },
      { value: "chaos", label: "Ik heb geen idee hoe alles samenhangt", score: 3 },
    ],
  },
  {
    id: "partner",
    question: "Is er nagedacht over wat er gebeurt als jij wegvalt?",
    subtext: "Voor je partner of gezin: nabestaandenpensioen, verzekeringen, etc.",
    type: "single",
    options: [
      { value: "arranged", label: "Ja, dit is goed geregeld", score: 0 },
      { value: "partial", label: "Gedeeltelijk, maar niet volledig", score: 2 },
      { value: "no", label: "Nee, hier heb ik niet bij stilgestaan", score: 3 },
      { value: "na", label: "Niet van toepassing (geen partner/gezin)", score: 0 },
    ],
  },
  {
    id: "action",
    question: "Hoe serieus neem je je pensioensituatie op dit moment?",
    subtext: "Wees eerlijk naar jezelf.",
    type: "single",
    options: [
      { value: "priority", label: "Het staat hoog op mijn prioriteitenlijst", score: 0 },
      { value: "should", label: "Ik weet dat ik er iets mee moet, maar stel uit", score: 2 },
      { value: "someday", label: "Ik denk: dat komt later wel", score: 3 },
      { value: "avoid", label: "Ik vermijd het onderwerp liever", score: 3 },
    ],
  },
  {
    id: "concern",
    question: "Wat houdt je het meest bezig als het gaat om je pensioen?",
    subtext: "Vertel in je eigen woorden wat je bezighoudt of onzeker maakt.",
    type: "open",
    placeholder: "Bijvoorbeeld: Ik weet niet of ik genoeg opbouw als ZZP'er...",
  },
];

// Result types
type ResultType = "simple" | "attention" | "complex";

function getResultType(totalScore: number): ResultType {
  if (totalScore <= 5) return "simple";
  if (totalScore <= 12) return "attention";
  return "complex";
}

// Result content
const resultContent: Record<ResultType, {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  points: string[];
  showCTA: boolean;
}> = {
  simple: {
    title: "Je situatie lijkt overzichtelijk",
    icon: "✓",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    description: "Op basis van je antwoorden lijkt je pensioensituatie relatief eenvoudig. Dat betekent niet dat je niets hoeft te doen — juist periodieke controle zorgt ervoor dat je op koers blijft.",
    points: [
      "Je hebt redelijk zicht op je situatie",
      "Periodieke check blijft verstandig (jaarlijks)",
      "Levensgebeurtenissen kunnen je situatie veranderen",
    ],
    showCTA: false,
  },
  attention: {
    title: "Je situatie verdient aandacht",
    icon: "!",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Uit je antwoorden blijkt dat er meerdere punten zijn die aandacht verdienen. Dit hoeft geen probleem te zijn, maar het is verstandig om hier eens rustig naar te kijken.",
    points: [
      "Er zijn onduidelijkheden in je totaaloverzicht",
      "Sommige zaken zijn mogelijk niet optimaal geregeld",
      "Een objectieve blik kan helderheid brengen",
    ],
    showCTA: true,
  },
  complex: {
    title: "Je situatie vraagt om maatwerk",
    icon: "⚡",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Je antwoorden laten zien dat er duidelijke aandachtspunten zijn. Dit is geen kritiek — veel mensen bevinden zich in deze situatie. Maar het betekent wel dat uitstel je niet gaat helpen.",
    points: [
      "Er ontbreekt overzicht of samenhang",
      "Er kunnen blinde vlekken zijn in je voorzieningen",
      "Persoonlijk advies is hier echt waardevol",
    ],
    showCTA: true,
  },
};

// Main Component
export default function PensioenDiagnosePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openAnswer, setOpenAnswer] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  // Calculate total score
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const resultType = getResultType(totalScore);
  const result = resultContent[resultType];

  const handleAnswer = (value: string, score: number) => {
    const newAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id)];
    newAnswers.push({ questionId: currentQuestion.id, value, score });
    setAnswers(newAnswers);

    // Auto-advance for single choice
    if (currentQuestion.type === "single") {
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsComplete(true);
        }
      }, 300);
    }
  };

  const handleOpenSubmit = () => {
    const newAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id)];
    newAnswers.push({ questionId: currentQuestion.id, value: openAnswer, score: 0 });
    setAnswers(newAnswers);
    setIsComplete(true);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead with diagnosis answers
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          source: "pensioen-diagnose",
          resultType,
          totalScore,
          answers: answers.map(a => ({ q: a.questionId, a: a.value })),
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current answer for highlighting
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Minimal Header */}
      <header className="py-6 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/pig-favicon-v2.png" alt="Logo" width={32} height={32} />
            <span className="font-bold text-slate-800">MijnPensioenGevuld</span>
          </Link>
          <span className="text-sm text-slate-500">Gratis Pensioen-Diagnose</span>
        </div>
      </header>

      <main className="py-8 sm:py-12 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Intro Screen */}
          {currentStep === 0 && answers.length === 0 && !isComplete && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Duurt slechts 2–3 minuten
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                Gratis Pensioen-Diagnose
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
                Ontdek of jouw pensioensituatie aandacht vraagt. Geen ingewikkelde berekeningen, 
                geen verplichtingen — alleen eerlijke inzichten.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-left mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">Wat kun je verwachten?</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-600 text-sm font-bold">1</span>
                    </div>
                    <span>8 korte vragen over jouw situatie en gevoel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-600 text-sm font-bold">2</span>
                    </div>
                    <span>Direct inzicht: is je situatie eenvoudig of vraagt het aandacht?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-600 text-sm font-bold">3</span>
                    </div>
                    <span>Geen advies, geen verkoop — alleen bewustwording</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-slate-500 mb-6">
                Je gegevens worden niet opgeslagen tenzij je zelf contact opneemt.
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {!isComplete && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                <span>Vraag {currentStep + 1} van {questions.length}</span>
                <span>{Math.round(progress)}% voltooid</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Question Card */}
          {!isComplete && currentQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* Question */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.subtext && (
                  <p className="text-slate-500 mb-6">{currentQuestion.subtext}</p>
                )}

                {/* Options */}
                {currentQuestion.type === "single" && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value, option.score)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          currentAnswer?.value === option.value
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            currentAnswer?.value === option.value
                              ? "border-orange-500 bg-orange-500"
                              : "border-slate-300"
                          }`}>
                            {currentAnswer?.value === option.value && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-slate-700 font-medium">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Open Question */}
                {currentQuestion.type === "open" && (
                  <div className="space-y-4">
                    <textarea
                      value={openAnswer}
                      onChange={(e) => setOpenAnswer(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      rows={4}
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 resize-none text-slate-700"
                    />
                    <button
                      onClick={handleOpenSubmit}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold transition-all"
                    >
                      Bekijk mijn resultaat
                    </button>
                    <button
                      onClick={() => {
                        setOpenAnswer("");
                        handleOpenSubmit();
                      }}
                      className="w-full text-slate-500 hover:text-slate-700 py-2 text-sm"
                    >
                      Liever overslaan
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              {currentStep > 0 && currentQuestion.type !== "open" && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Vorige vraag
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {isComplete && !showContactForm && !isSubmitted && (
            <div className="space-y-6">
              {/* Result Card */}
              <div className={`${result.bgColor} ${result.borderColor} border-2 rounded-2xl p-6 sm:p-8`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 ${result.bgColor} rounded-full flex items-center justify-center border-2 ${result.borderColor}`}>
                    <span className={`text-xl font-bold ${result.color}`}>{result.icon}</span>
                  </div>
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-bold ${result.color}`}>
                      {result.title}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  {result.description}
                </p>

                <div className="space-y-3">
                  {result.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 ${result.color} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-slate-600">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Now Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                <h3 className="font-bold text-slate-800 text-lg mb-4">
                  {result.showCTA ? "Wat nu?" : "Tip voor jou"}
                </h3>

                {result.showCTA ? (
                  <>
                    <p className="text-slate-600 mb-6">
                      Een persoonlijk gesprek kan je het overzicht geven dat je mist. Geen verkooppraatje, 
                      geen verplichting — gewoon een rustig gesprek via Zoom om je situatie te bespreken.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-5 mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Wat je kunt verwachten:</h4>
                      <ul className="space-y-2 text-slate-600 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          30 minuten via Zoom op een moment dat jou past
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          We brengen je situatie in kaart — niet meer, niet minder
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Je krijgt duidelijkheid, ongeacht of je klant wordt
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          100% vrijblijvend en gratis
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
                    >
                      Plan een vrijblijvend gesprek
                    </button>

                    <p className="text-center text-sm text-slate-500 mt-4">
                      Of bel direct: <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-orange-600 font-medium">{siteConfig.contact.phone}</a>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-slate-600 mb-6">
                      Hoewel je situatie overzichtelijk lijkt, is het verstandig om dit periodiek te checken. 
                      Levensgebeurtenissen zoals een nieuwe baan, kind, of verhuizing kunnen je situatie veranderen.
                    </p>

                    <div className="space-y-3">
                      <Link
                        href="/kennisbank"
                        className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-all"
                      >
                        Bekijk onze kennisbank
                      </Link>
                      <button
                        onClick={() => setShowContactForm(true)}
                        className="block w-full text-center text-slate-500 hover:text-slate-700 py-2 text-sm transition-colors"
                      >
                        Toch een gesprek plannen? Klik hier
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Trust Elements */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>AFM geregistreerd</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Privacy gewaarborgd</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {showContactForm && !isSubmitted && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Terug naar resultaat
              </button>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Plan je vrijblijvende gesprek
              </h2>
              <p className="text-slate-600 mb-6">
                Laat je gegevens achter en we nemen binnen 24 uur contact op om een moment te plannen.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Je naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="Volledige naam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="naam@voorbeeld.nl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Telefoonnummer (optioneel)
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="06 - 12345678"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Versturen...
                    </span>
                  ) : (
                    "Verstuur mijn gegevens"
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  We nemen binnen 24 uur contact op. Je gegevens zijn veilig bij ons.
                </p>
              </form>
            </div>
          )}

          {/* Success */}
          {isSubmitted && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Bedankt, {contactInfo.name.split(" ")[0]}!
              </h2>
              
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                We hebben je gegevens ontvangen. Je hoort binnen 24 uur van ons om een moment te plannen 
                voor je vrijblijvende gesprek.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 max-w-md mx-auto mb-8">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-800">In de tussentijd:</strong> Verzamel alvast je pensioenoverzichten 
                  van mijnpensioenoverzicht.nl — dat helpt om het gesprek zo waardevol mogelijk te maken.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug naar homepage
              </Link>
            </div>
          )}

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-slate-100 mt-12">
        <div className="max-w-3xl mx-auto text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MijnPensioenGevuld • AFM geregistreerd</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            {" • "}
            <Link href="/voorwaarden" className="hover:text-slate-700">Voorwaarden</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
