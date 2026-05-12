require("dotenv").config();
const { Bot, InlineKeyboard } = require("grammy");
const schedule = require("node-schedule");
const fs = require("fs");

const bot = new Bot(process.env.BOT_TOKEN);
const OWNER_ID = process.env.OWNER_ID;
const WEBINAR_LINK = process.env.WEBINAR_LINK;

const DB_FILE = "registrations.json";
let registrations = [];
if (fs.existsSync(DB_FILE)) {
  registrations = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function save() {
  fs.writeFileSync(DB_FILE, JSON.stringify(registrations, null, 2));
}

// /start — регистрация
bot.command("start", async (ctx) => {
  const { first_name, last_name, username, id } = ctx.from;
  const name = [first_name, last_name].filter(Boolean).join(" ");
  const tg = username ? `@${username}` : "нет username";

  const exists = registrations.find((r) => r.chat_id === id);
  if (!exists) {
    registrations.push({ chat_id: id, name, username: tg, date: new Date().toISOString() });
    save();
    if (OWNER_ID) {
      await bot.api.sendMessage(OWNER_ID, `📩 Новая запись!\n👤 ${name}\n🔗 ${tg}`);
    }
  }

  const kb = new InlineKeyboard()
    .text("📋 О вебинаре", "about").row()
    .text("🔗 Ссылка на платформу", "link").row()
    .text("❓ Частые вопросы", "faq");

  await ctx.reply(
    `Привет, ${name}! 👋\n\nВы записаны на вебинар:\n*«Бизнес Идея: как найти и запустить то, что работает»*\n\nСпикер: Владимир Лазарев 🎤\n\nЗа час до начала пришлём ссылку прямо сюда 🔔`,
    { parse_mode: "Markdown", reply_markup: kb }
  );
});

// О вебинаре
bot.callbackQuery("about", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    `📌 *Бизнес Идея: как найти и запустить то, что работает*\n\n` +
    `✅ Как выбрать идею под ваши ресурсы и навыки\n` +
    `✅ Как проверить идею быстро — без больших вложений\n` +
    `✅ Пошаговый план первых 7 дней\n\n` +
    `🎤 *Владимир Лазарев* — тренер по отношениям и бизнесу, 10 лет практики, 500+ клиентов\n\n` +
    `⏰ Ссылка придёт за час до начала`,
    { parse_mode: "Markdown" }
  );
});

// Ссылка
bot.callbackQuery("link", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(`🔗 Платформа вебинара:\n${WEBINAR_LINK}`);
});

// FAQ
bot.callbackQuery("faq", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    `❓ *Частые вопросы*\n\n` +
    `*Это платно?*\nНет, вебинар бесплатный.\n\n` +
    `*Нужно что-то устанавливать?*\nНет — всё работает в браузере.\n\n` +
    `*Будет запись?*\nДа, запись появится в архиве на платформе.\n\n` +
    `*Как войти на вебинар?*\nОткройте ссылку на платформу → найдите раздел «Прямой эфир» → введите имя → войдите.`,
    { parse_mode: "Markdown" }
  );
});

// Команда для получения своего ID (чтобы настроить OWNER_ID)
bot.command("myid", async (ctx) => {
  await ctx.reply(`Ваш Telegram ID: ${ctx.from.id}`);
});

// Рассылка напоминания — вызывается за час до вебинара
async function sendReminders() {
  const msg = `⏰ *Через 1 час начинается вебинар!*\n\n«Бизнес Идея: как найти и запустить то, что работает»\n\n🔗 Заходите сейчас:\n${WEBINAR_LINK}`;
  for (const r of registrations) {
    try {
      await bot.api.sendMessage(r.chat_id, msg, { parse_mode: "Markdown" });
    } catch (e) {
      console.log(`Не отправить ${r.name}:`, e.message);
    }
  }
  console.log(`Напоминания отправлены: ${registrations.length} участников`);
}

// Команда для ручной рассылки (для теста)
bot.command("remind", async (ctx) => {
  if (String(ctx.from.id) !== String(OWNER_ID)) return;
  await sendReminders();
  await ctx.reply("✅ Напоминания отправлены всем участникам!");
});

// Список участников (только для владельца)
bot.command("list", async (ctx) => {
  if (String(ctx.from.id) !== String(OWNER_ID)) return;
  if (registrations.length === 0) {
    await ctx.reply("Пока никто не записался.");
    return;
  }
  const text = registrations
    .map((r, i) => `${i + 1}. ${r.name} — ${r.username}`)
    .join("\n");
  await ctx.reply(`📋 Записались (${registrations.length}):\n\n${text}`);
});

bot.start();
console.log("Бот запущен ✅");
