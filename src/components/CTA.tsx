import LeadForm from "./LeadForm";

export default function CTA() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Готовы запустить
              <br />
              свой лендинг?
            </h2>
            <p className="text-lg text-brand-100 mb-8 leading-relaxed">
              Заполните форму, и мы отправим вам стартовый набор
              с пошаговой инструкцией. Никакого спама &mdash; только инструменты,
              которые помогут запуститься.
            </p>
            <div className="flex items-center gap-6 text-sm text-brand-200">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Бесплатный стартер
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                TG-уведомления
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
