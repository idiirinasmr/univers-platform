"use client";

import Link from "next/link";
import { useState } from "react";

const nicheOptions = [
  "Стоматология",
  "Бьюти",
  "Недвижимость",
  "Ресторан",
  "Онлайн-школа",
  "Фитнес",
  "Автосервис",
  "Строительство",
  "Психологи, коучи",
  "Корпорации",
  "Ремонт",
  "Репетиторство",
  "Другое",
];

const whatToExpect = [
  { icon: "🖥️", text: "Покажем платформу под вашу нишу — живой демо" },
  { icon: "💬", text: "Ответим на все вопросы без скриптов и давления" },
  { icon: "💰", text: "Скажем точную цену под ваш запрос" },
  { icon: "⏱️", text: "Обычно занимает 30 минут" },
];

export default function DemoPage() {
  const [form, setForm] = useState({ name: "", contact: "", niche: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Введи своё имя"); return; }
    if (!form.contact.trim()) { setError("Укажи телефон или Telegram"); return; }
    if (!form.niche) { setError("Выбери нишу"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.contact, niche: form.niche }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "rgba(10,10,15,0.9)",
        backdropFilter: "blur(12px)",
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: "none", fontSize: "20px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          <span className="gradient-text">Univers</span>
          <span style={{ color: "var(--text)" }}> Platform</span>
        </Link>
        <Link href="/" className="btn-secondary" style={{ padding: "8px 20px", fontSize: "14px" }}>← На главную</Link>
      </nav>

      {/* CONTENT */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "80px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "start",
      }}>

        {/* LEFT — INFO */}
        <div>
          <div className="tag" style={{ marginBottom: "20px" }}>Запросить демо</div>
          <h1 style={{
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: "800",
            lineHeight: "1.1",
            letterSpacing: "-1.5px",
            marginBottom: "20px",
          }}>
            <span className="gradient-text">Покажем платформу</span>
            <br />
            <span style={{ color: "var(--text)" }}>под твою нишу</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.7", marginBottom: "40px" }}>
            Заполни 3 поля — свяжемся в течение часа и покажем живую платформу, уже настроенную под твой бизнес.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {whatToExpect.map((item) => (
              <div key={item.text} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>{item.icon}</span>
                <span style={{ color: "var(--text)", fontSize: "15px", lineHeight: "1.5", paddingTop: "6px" }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Niches preview */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "20px",
          }}>
            <div style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "12px" }}>Доступные ниши:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["🦷 Стоматология", "💅 Бьюти", "🏠 Недвижимость", "🍕 Ресторан", "📚 Онлайн-школа", "🏋️ Фитнес", "🚗 Автосервис", "🏗️ Строительство", "🧠 Психологи", "🏢 Корпорации"].map((n) => (
                <span key={n} style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div>
          {submitted ? (
            <div style={{
              background: "var(--surface)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "24px",
              padding: "48px 32px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>✅</div>
              <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.5px" }}>
                Заявка принята!
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
                Свяжемся с тобой в течение часа в рабочее время.
                Покажем платформу под твою нишу — без обязательств.
              </p>
              <div style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "28px",
                fontSize: "14px",
                color: "#22c55e",
                textAlign: "left",
              }}>
                <div style={{ fontWeight: "700", marginBottom: "4px" }}>Что будет дальше:</div>
                <div>1. Мы напишем тебе в Telegram или позвоним</div>
                <div>2. Согласуем удобное время (30 мин)</div>
                <div>3. Покажем платформу вживую под твою нишу</div>
              </div>
              <Link href="/" className="btn-secondary" style={{ padding: "12px 24px", fontSize: "15px" }}>
                ← На главную
              </Link>
            </div>
          ) : (
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "40px 32px",
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.5px" }}>
                Оставить заявку
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "28px" }}>
                Без спама. Только по делу.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px" }}>
                    Как тебя зовут?
                  </label>
                  <input
                    type="text"
                    placeholder="Имя или имя + фамилия"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                      color: "var(--text)",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.6)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  />
                </div>

                {/* Contact */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px" }}>
                    Телефон или Telegram
                  </label>
                  <input
                    type="text"
                    placeholder="+7 (xxx) xxx-xx-xx или @username"
                    value={form.contact}
                    onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                      color: "var(--text)",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.6)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  />
                </div>

                {/* Niche */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px" }}>
                    Ниша вашего бизнеса
                  </label>
                  <select
                    value={form.niche}
                    onChange={e => setForm(f => ({ ...f, niche: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                      color: form.niche ? "var(--text)" : "var(--muted)",
                      fontSize: "15px",
                      outline: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      appearance: "none",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.6)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  >
                    <option value="" disabled>Выбери нишу...</option>
                    {nicheOptions.map(n => (
                      <option key={n} value={n} style={{ background: "#12121a" }}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#ef4444",
                  }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: "700",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    marginTop: "4px",
                  }}
                >
                  {loading ? "Отправляем..." : "✨ Отправить заявку"}
                </button>

                <p style={{ color: "var(--muted)", fontSize: "12px", textAlign: "center", margin: "0" }}>
                  Нажимая кнопку, ты соглашаешься с обработкой персональных данных
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 700px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
