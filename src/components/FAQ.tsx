"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "Not at all! This starter is built for product managers, marketers, and founders who want to ship fast using vibe coding — just describe what you want and AI builds it.",
  },
  {
    q: "What tech stack is this built on?",
    a: "Next.js 14 (React), Tailwind CSS for styling, Prisma ORM with PostgreSQL for the database, and Docker for deployment. Everything is TypeScript.",
  },
  {
    q: "How does lead capture work?",
    a: "When a visitor submits the form, their data is saved to PostgreSQL via Prisma, a lead_created event is logged, and you get an instant Telegram notification.",
  },
  {
    q: "What is the webhook inbox for?",
    a: "It's a secure endpoint that accepts events from external services (payment providers, CRMs, etc.). It has built-in idempotency so duplicate deliveries won't create duplicate records.",
  },
  {
    q: "Can I deploy this anywhere?",
    a: "Yes! Use docker-compose on any VPS, or deploy to Vercel with a managed Postgres (like Supabase or Neon). The README covers both options.",
  },
  {
    q: "Is it free?",
    a: "Completely free and open source. Use it for your projects, modify it, learn from it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div id={`faq-answer-${i}`} role="region" className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
