import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, niche } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: "Заполните имя и телефон" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Бот не настроен" }, { status: 500 });
  }

  const text =
    `📩 *Новая заявка с сайта!*\n\n` +
    `👤 Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `🏢 Ниша: ${niche || "не указана"}`;

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Ошибка отправки в Telegram" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
