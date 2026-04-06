const stats = [
  { value: "2 500+", label: "Лендингов запущено" },
  { value: "98%", label: "Аптайм SLA" },
  { value: "4.9/5", label: "Оценка разработчиков" },
  { value: "<3 мин", label: "Среднее время деплоя" },
];

const logos = [
  "TechCrunch", "Product Hunt", "Y Combinator", "Stripe", "Vercel",
];

export default function Proof() {
  return (
    <section id="proof" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Trusted by */}
        <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-8">
          Нам доверяют команды из
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
          {logos.map((name) => (
            <span
              key={name}
              className="text-xl font-bold text-gray-300 hover:text-gray-400 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-gray-50">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-600 mb-2">
                {s.value}
              </div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <blockquote className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
            &ldquo;Мы запустили MVP-лендинг меньше чем за час. Встроенная аналитика
            и Telegram-оповещения сэкономили нам недели настройки.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-gray-500">
            <strong className="text-gray-700">Алексей Петров</strong> &mdash; CTO, LaunchPad
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
