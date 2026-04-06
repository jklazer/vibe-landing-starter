import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import TrackView from "@/components/TrackView";

export default function Home() {
  return (
    <>
      <TrackView />
      <Header />
      <main>
        <Hero />
        <Proof />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        &copy; {new Date().getFullYear()} VibeLanding Starter
      </footer>
    </>
  );
}
