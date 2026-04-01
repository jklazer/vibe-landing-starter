"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  useEffect(() => {
    // Track landing view once per session
    if (!sessionStorage.getItem("landing_viewed")) {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "landing_view" }),
      });
      sessionStorage.setItem("landing_viewed", "1");
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Proof />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        &copy; {new Date().getFullYear()} VibeLanding Starter. Built with Next.js, Prisma &amp; Tailwind.
      </footer>
    </>
  );
}
