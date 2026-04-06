"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Нужен ли опыт в программировании?",
    a: "Совсем нет! Этот стартер создан для продакт-менеджеров, маркетологов и фаундеров, которые хотят быстро запускать продукты с помощью вайбкодинга — просто опишите, что вам нужно, и AI построит это.",
  },
  {
    q: "На каком стеке это построено?",
    a: "Next.js 14 (React), Tailwind CSS для стилей, Prisma ORM с PostgreSQL для базы данных и Docker для деплоя. Всё на TypeScript.",
  },
  {
    q: "Как работает сбор заявок?",
    a: "Когда посетитель отправляет форму, его данные сохраняются в PostgreSQL через Prisma, логируется событие lead_created, и вы мгновенно получаете уведомление в Telegram.",
  },
  {
    q: "Для чего нужен webhook-приёмник?",
    a: "Это защищённый эндпоинт, который принимает события от внешних сервисов (платёжные системы, CRM и т.д.). Встроенная идемпотентность гарантирует, что повторные доставки не создадут дублей.",
  },
  {
    q: "Можно ли задеплоить куда угодно?",
    a: "Да! Используйте docker-compose на любом VPS или задеплойте на Vercel с управляемым Postgres (например, Supabase или Neon). В README описаны оба варианта.",
  },
  {
    q: "Это бесплатно?",
    a: "Полностью бесплатно и с открытым исходным кодом. Используйте для своих проектов, модифицируйте, учитесь.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Частые вопросы
          </h2>
          <p className="text-lg text-gray-500">
            Всё, что нужно знать перед началом работы.
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
