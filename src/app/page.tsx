import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import HeroCurveSeparator from "@/components/ui/HeroCurveSeparator";
import PainPoints from "@/components/sections/PainPoints";
import SolutionsTabs from "@/components/sections/SolutionsTabs";
import ScrollTextReveal from "@/components/sections/ScrollTextReveal";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import AboutStudio from "@/components/sections/AboutStudio";
import InteractiveWizard from "@/components/sections/InteractiveWizard";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <HeroCurveSeparator />
      <PainPoints />
      <SolutionsTabs />
      <ScrollTextReveal />
      <ProcessTimeline />
      <AboutStudio />
      <InteractiveWizard />
      <Footer />
    </main>
  );
}
