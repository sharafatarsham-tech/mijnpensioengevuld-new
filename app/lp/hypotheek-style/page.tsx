import TopBar from "@/components/hypotheek-style/TopBar";
import Header from "@/components/hypotheek-style/Header";
import Hero from "@/components/hypotheek-style/Hero";
import RateComparison from "@/components/hypotheek-style/RateComparison";
import TrustLogos from "@/components/hypotheek-style/TrustLogos";
import ScenarioCards from "@/components/hypotheek-style/ScenarioCards";
import Reviews from "@/components/hypotheek-style/Reviews";
import ContentBlocks from "@/components/hypotheek-style/ContentBlocks";
import NewsletterCTA from "@/components/hypotheek-style/NewsletterCTA";
import Footer from "@/components/hypotheek-style/Footer";

export default function HypotheekStylePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <Hero />
      <RateComparison />
      <TrustLogos />
      <ScenarioCards />
      <Reviews />
      <ContentBlocks />
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
