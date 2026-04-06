"use client";

import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", contact: "", consent: false });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;

    setStatus("loading");
    // Track CTA click
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "cta_click", payload: { section: "cta_form" } }),
    }).catch(() => {});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", contact: "", consent: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="text-center p-8 rounded-2xl bg-green-50 border border-green-200">
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Спасибо!</h3>
        <p className="text-green-600">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ваше имя
        </label>
        <input
          id="name"
          type="text"
          required
          minLength={2}
          maxLength={200}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Иван Иванов"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
          Email или телефон
        </label>
        <input
          id="contact"
          type="text"
          required
          minLength={3}
          maxLength={200}
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="ivan@example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
        />
        <span className="text-sm text-gray-500">
          Я согласен на обработку персональных данных и принимаю{" "}
          <a href="#" className="text-brand-600 underline">Политику конфиденциальности</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={!form.consent || status === "loading"}
        className="w-full px-6 py-4 rounded-xl bg-brand-600 text-white font-semibold text-lg shadow-lg shadow-brand-600/25 hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправка..." : "Получить ранний доступ"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500 text-center">Что-то пошло не так. Попробуйте ещё раз.</p>
      )}
    </form>
  );
}
