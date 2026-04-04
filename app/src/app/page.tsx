"use client";

import Link from "next/link";
import { useState } from "react";

const nicheSlug: Record<string, string> = {
  "Стоматология": "dentistry",
  "Бьюти": "beauty",
  "Недвижимость": "real-estate",
  "Ресторан": "restaurant",
  "Онлайн-школа": "school",
  "Фитнес": "fitness",
  "Автосервис": "autoservice",
  "Строительство": "construction",
  "Психологи, коучи": "coaching",
  "Корпорации": "enterprise",
  "Ремонт": "repair",
  "Репетиторство": "tutoring",
};

const niches = [
  { icon: "🦷", name: "Стоматология", desc: "Запись, карточки пациентов, CRM" },
  { icon: "💅", name: "Бьюти", desc: "Онлайн-запись, мастера, портфолио" },
  { icon: "🏠", name: "Недвижимость", desc: "Каталог объектов, заявки, агенты" },
  { icon: "🍕", name: "Ресторан", desc: "Меню, заказы, доставка" },
  { icon: "📚", name: "Онлайн-школа", desc: "Курсы, кабинеты, вебинары" },
  { icon: "🏋️", name: "Фитнес", desc: "Расписание, тренеры, абонементы" },
  { icon: "🚗", name: "Автосервис", desc: "Заявки, история ТО, уведомления" },
  { icon: "🏗️", name: "Строительство", desc: "Объекты, сметы, этапы, бригады" },
  { icon: "🧠", name: "Психологи, коучи", desc: "Сессии, кабинеты клиентов, задания" },
  { icon: "🏢", name: "Корпорации", desc: "White-label, SLA, интеграции" },
  { icon: "🔧", name: "Ремонт", desc: "Электрика, сантехника, плитка, окна" },
  { icon: "✏️", name: "Репетиторство", desc: "Расписание, ученики, оплата занятий" },
];

const nicheModules: Record<string, { icon: string; title: string; desc: string }[]> = {
  "Стоматология": [
    { icon: "📅", title: "Онлайн-запись к врачу", desc: "Клиент сам выбирает врача, дату и время" },
    { icon: "🗂️", title: "Карточки пациентов", desc: "История лечения, снимки, диагнозы" },
    { icon: "🔔", title: "Напоминания о визите", desc: "Автоматически в Telegram или SMS" },
    { icon: "📊", title: "CRM-воронка заявок", desc: "Новый → Записан → Принят → Оплачен" },
    { icon: "🤖", title: "AI-агент на сайте", desc: "Отвечает на вопросы и записывает 24/7" },
    { icon: "💳", title: "Онлайн-оплата", desc: "ЮKassa — приём оплаты прямо с сайта" },
  ],
  "Бьюти": [
    { icon: "📅", title: "Онлайн-запись к мастеру", desc: "Клиент выбирает мастера, услугу, время" },
    { icon: "🖼️", title: "Портфолио работ", desc: "Галерея фото — до/после, каждый мастер" },
    { icon: "👩‍🎨", title: "Профили мастеров", desc: "Услуги, цены, отзывы, расписание" },
    { icon: "🎟️", title: "Абонементы и пакеты", desc: "Продажа пакетов визитов онлайн" },
    { icon: "⭐", title: "Отзывы клиентов", desc: "Автосбор после визита, рейтинг мастера" },
    { icon: "🤖", title: "Telegram-бот", desc: "Запись, напоминания, акции в мессенджере" },
  ],
  "Недвижимость": [
    { icon: "🏘️", title: "Каталог объектов", desc: "Фото, планировки, цены, фильтры" },
    { icon: "📋", title: "Заявки покупателей", desc: "Каждый лид попадает в CRM автоматически" },
    { icon: "👔", title: "Профили агентов", desc: "Объекты агента, сделки, статистика" },
    { icon: "📁", title: "Документы по сделке", desc: "Договоры, акты, история переписки" },
    { icon: "📊", title: "Аналитика продаж", desc: "Конверсия, выручка, воронка по агентам" },
    { icon: "🤖", title: "AI-агент на сайте", desc: "Подбирает объекты и отвечает на вопросы" },
  ],
  "Ресторан": [
    { icon: "🍽️", title: "Меню с категориями", desc: "Фото блюд, состав, КБЖУ, цены" },
    { icon: "🛒", title: "Онлайн-заказы", desc: "Заказ на сайте или через Telegram-бот" },
    { icon: "🚴", title: "Доставка и статусы", desc: "Клиент видит статус заказа в реальном времени" },
    { icon: "🪑", title: "Бронирование столика", desc: "Онлайн-бронь с выбором зала и времени" },
    { icon: "🎁", title: "Акции и скидки", desc: "Купоны, программа лояльности, промокоды" },
    { icon: "🤖", title: "Telegram-заказы", desc: "Полный заказ прямо в мессенджере" },
  ],
  "Онлайн-школа": [
    { icon: "🎓", title: "Каталог курсов", desc: "Описание, программа, цена, отзывы" },
    { icon: "👤", title: "Личные кабинеты учеников", desc: "Прогресс, уроки, задания, сертификаты" },
    { icon: "🎥", title: "Уроки и вебинары", desc: "Видео, тексты, тесты — всё в одном месте" },
    { icon: "📝", title: "Домашние задания", desc: "Ученик сдаёт, куратор проверяет и оставляет фидбек" },
    { icon: "📈", title: "Прогресс обучения", desc: "Ученик видит, что пройдено и что осталось" },
    { icon: "🤖", title: "AI-куратор", desc: "Отвечает на вопросы по курсу 24/7" },
  ],
  "Фитнес": [
    { icon: "🗓️", title: "Расписание занятий", desc: "Групповые и индивидуальные, онлайн и офлайн" },
    { icon: "🏋️", title: "Профили тренеров", desc: "Специализация, расписание, отзывы" },
    { icon: "🎟️", title: "Абонементы и оплата", desc: "Продажа онлайн, автоматическое продление" },
    { icon: "📅", title: "Запись на тренировку", desc: "Клиент записывается сам, тренер видит список" },
    { icon: "📊", title: "Статистика посещений", desc: "Сколько ходит, когда, какие занятия популярны" },
    { icon: "🤖", title: "Telegram-бот", desc: "Расписание, запись и напоминания в мессенджере" },
  ],
  "Автосервис": [
    { icon: "🔧", title: "Заявки на ремонт", desc: "Клиент оставляет заявку онлайн или через бота" },
    { icon: "🚗", title: "История ТО автомобиля", desc: "Все работы, запчасти, даты по каждому авто" },
    { icon: "🔔", title: "Уведомления о готовности", desc: "Авто готово — клиент получает сообщение" },
    { icon: "💰", title: "Прайс-лист услуг", desc: "Актуальные цены, онлайн-оценка стоимости" },
    { icon: "📊", title: "CRM-воронка", desc: "Заявка → В работе → Готово → Оплачено" },
    { icon: "🤖", title: "AI-агент", desc: "Принимает заявки и консультирует 24/7" },
  ],
  "Строительство": [
    { icon: "🏗️", title: "Заявки на объекты", desc: "Клиент описывает задачу — попадает в CRM" },
    { icon: "📋", title: "Этапы строительства", desc: "Фундамент → Стены → Кровля → Сдача" },
    { icon: "💰", title: "Сметы и документы", desc: "Смета онлайн, согласование, история версий" },
    { icon: "👷", title: "Бригады и подрядчики", desc: "Кто на каком объекте, задачи, отчёты" },
    { icon: "📸", title: "Фото-отчёты", desc: "Клиент видит прогресс стройки по фото" },
    { icon: "🤖", title: "AI-агент", desc: "Отвечает на вопросы и принимает заявки 24/7" },
  ],
  "Психологи, коучи": [
    { icon: "📅", title: "Онлайн-запись на сессию", desc: "Клиент выбирает специалиста и удобное время" },
    { icon: "👤", title: "Личный кабинет клиента", desc: "История сессий, материалы, заметки" },
    { icon: "📝", title: "Домашние задания", desc: "Специалист даёт задание, клиент выполняет" },
    { icon: "🔒", title: "Конфиденциальность", desc: "Защищённый чат, доступ только по логину" },
    { icon: "💳", title: "Оплата сессий", desc: "Онлайн-оплата до встречи, пакеты сессий" },
    { icon: "🤖", title: "Telegram-бот", desc: "Запись, напоминания и поддержка в мессенджере" },
  ],
  "Корпорации": [
    { icon: "🏷️", title: "White-label", desc: "Платформа под вашим брендом и доменом" },
    { icon: "🔐", title: "SSO / SAML", desc: "Вход через корпоративный аккаунт" },
    { icon: "🏢", title: "Мультитенантность", desc: "Несколько отделов / филиалов в одной системе" },
    { icon: "📋", title: "Аудит действий", desc: "Кто, что и когда сделал — полный лог" },
    { icon: "📄", title: "SLA-договор", desc: "Гарантированное время ответа и uptime" },
    { icon: "🔗", title: "Интеграции", desc: "1С, Битрикс24, AmoCRM, Slack, Jira" },
  ],
  "Ремонт": [
    { icon: "📋", title: "Приём заявок", desc: "Клиент описывает задачу онлайн или через Telegram" },
    { icon: "💰", title: "Сметы и расчёты", desc: "Быстрый расчёт стоимости по типу работ" },
    { icon: "👷", title: "База мастеров", desc: "Специализация, рейтинг, загруженность мастеров" },
    { icon: "📍", title: "Статусы выполнения", desc: "Принято → В работе → Готово — клиент видит онлайн" },
    { icon: "📸", title: "Фото до/после", desc: "Приёмка работы с фотофиксацией в карточке" },
    { icon: "🤖", title: "AI-агент", desc: "Принимает заявки и консультирует 24/7" },
  ],
  "Репетиторство": [
    { icon: "📅", title: "Расписание занятий", desc: "Ученик записывается сам, преподаватель подтверждает" },
    { icon: "👤", title: "Кабинет ученика", desc: "Прогресс, задания, записи занятий и обратная связь" },
    { icon: "📝", title: "Домашние задания", desc: "Преподаватель даёт задание, ученик сдаёт онлайн" },
    { icon: "💳", title: "Оплата занятий", desc: "Пакеты уроков, онлайн-оплата, история платежей" },
    { icon: "📊", title: "Прогресс и оценки", desc: "Динамика успеваемости, отчёты для родителей" },
    { icon: "🤖", title: "Telegram-бот", desc: "Напоминания, задания и связь с преподавателем" },
  ],
};

const proofStats = [
  { num: "10+", label: "ниш адаптировано" },
  { num: "2 нед", label: "до запуска платформы" },
  { num: "24/7", label: "работает AI-агент" },
  { num: "0", label: "программистов нужно" },
];

const cases = [
  {
    icon: "🦷",
    niche: "Стоматология",
    metric: "+34%",
    metricLabel: "записей за 3 месяца",
    detail: "AI-агент в Telegram заменил 80% входящих звонков. Администратор освободился от рутины.",
  },
  {
    icon: "💅",
    niche: "Бьюти-студия",
    metric: "−60%",
    metricLabel: "отмен и неявок",
    detail: "Автонапоминания за 24 часа снизили потери от пустых окошек у мастеров.",
  },
  {
    icon: "📚",
    niche: "Онлайн-школа",
    metric: "×2.5",
    metricLabel: "выручки за полгода",
    detail: "Личные кабинеты и AI-куратор увеличили доходимость до конца курса.",
  },
];

const comparison = [
  { param: "Срок запуска", dev: "6–18 мес", bitrix: "2–4 мес", univers: "2 недели" },
  { param: "Стоимость старта", dev: "1–10 млн ₽", bitrix: "от 50 тыс ₽", univers: "от 30 тыс ₽" },
  { param: "AI-агент в Telegram", dev: "❌", bitrix: "⚠️ слабый", univers: "✅ полноценный" },
  { param: "Нишевая адаптация", dev: "✅ долго", bitrix: "⚠️ сложно", univers: "✅ за 2 недели" },
  { param: "Личные кабинеты клиентов", dev: "✅ дорого", bitrix: "⚠️ базово", univers: "✅ включено" },
  { param: "Без программистов", dev: "❌", bitrix: "⚠️ частично", univers: "✅" },
];

const plans = [
  {
    name: "Старт",
    price: "5 000 ₽",
    period: "/мес",
    desc: "Самозанятые и малый бизнес",
    features: [
      "AI-агент (браузер + Telegram)",
      "CRM до 500 клиентов",
      "Онлайн-запись",
      "Личный кабинет клиента",
      "Уведомления email + Telegram",
      "Поддержка в Telegram",
    ],
    cta: "Начать →",
    highlighted: false,
    badge: null,
  },
  {
    name: "Бизнес",
    price: "15 000 ₽",
    period: "/мес",
    desc: "Средний бизнес, сети, школы",
    features: [
      "Всё из «Старта»",
      "Безлимит клиентов в CRM",
      "Нишевые модули под вас",
      "Аналитика и отчёты",
      "Интеграции (1С, Telegram)",
      "White-label — ваш бренд и домен",
      "Выделенный менеджер",
    ],
    cta: "Запросить демо →",
    highlighted: true,
    badge: "Популярный",
  },
  {
    name: "Enterprise",
    price: "По запросу",
    period: "",
    desc: "Корпорации, холдинги, сети 50+",
    features: [
      "Всё из «Бизнеса»",
      "SSO / SAML",
      "On-premise / Private Cloud",
      "SLA с финансовыми гарантиями",
      "Аудит действий",
      "Кастомные интеграции (SAP, ERP)",
      "Обучение команды",
    ],
    cta: "Написать нам →",
    highlighted: false,
    badge: null,
  },
];

const faq = [
  {
    q: "Telegram действительно работает как полноценный канал?",
    a: "Да. Клиент пишет боту в Telegram, AI-агент отвечает, принимает заявку и записывает. Все данные синхронизируются с CRM в реальном времени. Отдельное приложение не нужно.",
  },
  {
    q: "Можно запустить платформу под своим брендом?",
    a: "Да — это называется White-label. Ваши клиенты видят ваш логотип, ваш домен (например, app.mystudio.ru) и ваш дизайн. Univers Platform остаётся за кулисами.",
  },
  {
    q: "Нужен ли программист для работы с платформой?",
    a: "Нет. Первоначальную настройку под вашу нишу делаем мы за 2 недели. Дальше вы управляете через интерфейс без кода.",
  },
  {
    q: "Что входит в 2 недели запуска?",
    a: "Настройка ниши, ваши услуги/специалисты, подключение Telegram-бота, настройка AI-агента, обучение команды. Вы получаете готовую рабочую платформу.",
  },
  {
    q: "Как работает AI-агент?",
    a: "Агент работает на Claude (Anthropic) — одна из лучших языковых моделей. Понимает контекст разговора, отвечает на сложные вопросы, принимает заявки и записывает клиентов. Это не скриптовый бот.",
  },
  {
    q: "Можно интегрировать с 1С, amoCRM, Битрикс24?",
    a: "Да. Интеграции доступны на тарифах «Бизнес» и «Enterprise»: 1С, amoCRM, Битрикс24, Slack, Google Calendar.",
  },
  {
    q: "Как попробовать перед покупкой?",
    a: "Запросите демо — покажем платформу под вашу нишу за 30 минут. Без регистрации и без обязательств.",
  },
];

const features = [
  { icon: "🤖", title: "AI-агент 24/7", desc: "Отвечает клиентам, принимает заявки и записывает — без вашего участия. Работает в браузере и Telegram." },
  { icon: "📊", title: "Встроенная CRM", desc: "Kanban-воронка, история клиентов, автозадачи. Лучше, чем отдельный сервис — всё связано." },
  { icon: "👤", title: "Личный кабинет", desc: "Клиент видит историю, курсы, домашние задания и общается с поддержкой в одном месте." },
  { icon: "📱", title: "Браузер + Telegram", desc: "Не нужно выбирать. Платформа работает везде одинаково — данные синхронизированы." },
];

const steps = [
  { num: "01", title: "Выбираешь нишу", desc: "Стоматология, бьюти, ресторан — говоришь нам." },
  { num: "02", title: "Мы адаптируем ядро", desc: "Берём готовую платформу и настраиваем под твой бизнес за 2 недели." },
  { num: "03", title: "Запускаешь с клиентами", desc: "Получаешь платформу под своим брендом, готовую к работе." },
];

export default function Home() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          <span className="gradient-text">Univers</span>
          <span style={{ color: "var(--text)" }}> Platform</span>
        </span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link href="/login" className="btn-secondary" style={{ padding: "8px 20px", fontSize: "14px" }}>Войти</Link>
          <Link href="/demo" className="btn-primary" style={{ padding: "8px 20px", fontSize: "14px" }}>Запросить демо</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: "800px", margin: "0 auto" }}>
        <div className="tag" style={{ marginBottom: "24px" }}>🚀 Универсальная бизнес-платформа</div>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: "800", lineHeight: "1.1", letterSpacing: "-2px", marginBottom: "24px" }}>
          <span className="gradient-text">Одна платформа</span>
          <br />
          <span style={{ color: "var(--text)" }}>— любой бизнес</span>
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "var(--muted)", margin: "0 auto 40px", maxWidth: "580px" }}>
          Копируешь, дорабатываешь под нишу, продаёшь клиенту.
          CRM, AI-агент, личные кабинеты — всё внутри. Работает в браузере и Telegram.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/demo" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>✨ Запросить демо</Link>
          <Link href="#how" className="btn-secondary" style={{ fontSize: "16px", padding: "14px 32px" }}>Как это работает →</Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "32px 24px",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          textAlign: "center",
        }}>
          {proofStats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "36px", fontWeight: "900", background: "linear-gradient(135deg,#a855f7,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: "1.2" }}>{s.num}</div>
              <div style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NICHES */}
      <section style={{ padding: "80px 24px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: "8px", fontSize: "15px" }}>Адаптируется под любую нишу</p>
        <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: "40px", fontSize: "13px", opacity: 0.6 }}>Нажми на нишу — увидишь модули и демо-платформу</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px" }}>
          {niches.map((niche) => {
            const isSelected = selectedNiche === niche.name;
            return (
              <div
                key={niche.name}
                className="card"
                onClick={() => setSelectedNiche(prev => prev === niche.name ? null : niche.name)}
                style={{
                  padding: "24px",
                  cursor: "pointer",
                  borderColor: isSelected ? "rgba(124,58,237,0.8)" : undefined,
                  background: isSelected ? "rgba(124,58,237,0.12)" : undefined,
                  boxShadow: isSelected ? "0 0 0 1px rgba(124,58,237,0.5), 0 8px 32px rgba(124,58,237,0.2)" : undefined,
                  transform: isSelected ? "translateY(-2px)" : undefined,
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{niche.icon}</div>
                <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "6px", color: isSelected ? "#a855f7" : "var(--text)" }}>{niche.name}</div>
                <div style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.5" }}>{niche.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NICHE MODULES */}
      {selectedNiche && nicheModules[selectedNiche] && (
        <section style={{ padding: "16px 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(99,102,241,0.05))",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "24px",
            padding: "40px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "28px" }}>{niches.find(n => n.name === selectedNiche)?.icon}</span>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", margin: 0, letterSpacing: "-0.5px" }}>{selectedNiche}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", margin: "4px 0 0" }}>Модули платформы для этой ниши</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "16px", marginBottom: "32px" }}>
              {nicheModules[selectedNiche].map((module) => (
                <div key={module.title} style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>{module.icon}</span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px" }}>{module.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.5" }}>{module.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href={`/platform/${nicheSlug[selectedNiche]}`}
                className="btn-primary"
                style={{ fontSize: "15px", padding: "12px 28px" }}
              >
                🖥️ Открыть демо-платформу →
              </Link>
              <Link
                href="/demo"
                className="btn-secondary"
                style={{ fontSize: "15px", padding: "12px 28px" }}
              >
                Хочу такую платформу
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div className="tag" style={{ marginBottom: "16px" }}>Как это работает</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", marginBottom: "60px", letterSpacing: "-1px" }}>Три шага до запуска</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "24px" }}>
          {steps.map((step) => (
            <div key={step.num} className="card" style={{ padding: "32px 24px", textAlign: "left" }}>
              <div style={{
                fontSize: "48px", fontWeight: "900",
                background: "linear-gradient(135deg,#7c3aed,#6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "16px", lineHeight: "1",
              }}>{step.num}</div>
              <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>{step.title}</div>
              <div style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="tag" style={{ marginBottom: "16px" }}>Возможности</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", letterSpacing: "-1px" }}>Всё что нужно — уже внутри</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ padding: "28px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <div style={{ fontWeight: "700", fontSize: "17px", marginBottom: "10px" }}>{f.title}</div>
              <div style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="tag" style={{ marginBottom: "16px" }}>Результаты</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", letterSpacing: "-1px" }}>Что получают клиенты</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", marginTop: "16px" }}>Реальные результаты после внедрения платформы</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
          {cases.map((c) => (
            <div key={c.niche} className="card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{c.icon}</div>
              <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.niche}</div>
              <div style={{
                fontSize: "52px", fontWeight: "900", lineHeight: "1",
                background: "linear-gradient(135deg,#a855f7,#6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "8px",
              }}>{c.metric}</div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "12px" }}>{c.metricLabel}</div>
              <div style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: "0 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="tag" style={{ marginBottom: "16px" }}>Сравнение</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", letterSpacing: "-1px" }}>Univers Platform vs альтернативы</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0", fontSize: "15px" }}>
            <thead>
              <tr>
                <th style={{ padding: "16px 20px", textAlign: "left", color: "var(--muted)", fontWeight: "600", fontSize: "13px", borderBottom: "1px solid var(--border)" }}>Параметр</th>
                <th style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)", fontWeight: "600", fontSize: "13px", borderBottom: "1px solid var(--border)" }}>Разработка с нуля</th>
                <th style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)", fontWeight: "600", fontSize: "13px", borderBottom: "1px solid var(--border)" }}>Битрикс24</th>
                <th style={{
                  padding: "16px 20px", textAlign: "center", fontWeight: "700", fontSize: "13px",
                  borderBottom: "1px solid rgba(124,58,237,0.4)",
                  background: "rgba(124,58,237,0.08)",
                  color: "#a855f7",
                  borderRadius: "12px 12px 0 0",
                }}>Univers Platform</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.param}>
                  <td style={{ padding: "14px 20px", color: "var(--text)", borderBottom: i < comparison.length - 1 ? "1px solid var(--border)" : "none", fontWeight: "500" }}>{row.param}</td>
                  <td style={{ padding: "14px 20px", textAlign: "center", color: "var(--muted)", borderBottom: i < comparison.length - 1 ? "1px solid var(--border)" : "none" }}>{row.dev}</td>
                  <td style={{ padding: "14px 20px", textAlign: "center", color: "var(--muted)", borderBottom: i < comparison.length - 1 ? "1px solid var(--border)" : "none" }}>{row.bitrix}</td>
                  <td style={{
                    padding: "14px 20px", textAlign: "center", fontWeight: "600",
                    background: "rgba(124,58,237,0.06)",
                    borderBottom: i < comparison.length - 1 ? "1px solid rgba(124,58,237,0.15)" : "none",
                    color: "var(--text)",
                    borderRadius: i === comparison.length - 1 ? "0 0 12px 12px" : undefined,
                  }}>{row.univers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="tag" style={{ marginBottom: "16px" }}>Тарифы</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", letterSpacing: "-1px" }}>Прозрачные цены</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", marginTop: "16px" }}>Не знаешь какой подойдёт? Напиши — поможем разобраться.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px", alignItems: "start" }}>
          {plans.map((plan) => (
            <div key={plan.name} className="card" style={{
              padding: "32px",
              position: "relative",
              borderColor: plan.highlighted ? "rgba(124,58,237,0.6)" : undefined,
              boxShadow: plan.highlighted ? "0 0 0 1px rgba(124,58,237,0.3), 0 16px 48px rgba(124,58,237,0.15)" : undefined,
            }}>
              {plan.badge && (
                <div style={{
                  position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#7c3aed,#6366f1)",
                  padding: "4px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}
              <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>{plan.name}</div>
              <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px" }}>{plan.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
                <span style={{
                  fontSize: plan.price === "По запросу" ? "22px" : "34px",
                  fontWeight: "900",
                  background: "linear-gradient(135deg,#a855f7,#6366f1)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{plan.price}</span>
                {plan.period && <span style={{ color: "var(--muted)", fontSize: "14px" }}>{plan.period}</span>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px" }}>
                    <span style={{ color: "#a855f7", flexShrink: 0, marginTop: "1px" }}>✓</span>
                    <span style={{ color: "var(--text)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/demo" className={plan.highlighted ? "btn-primary" : "btn-secondary"} style={{ display: "block", textAlign: "center", padding: "12px 20px", fontSize: "15px" }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 24px 80px", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="tag" style={{ marginBottom: "16px" }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: "800", letterSpacing: "-1px" }}>Частые вопросы</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {faq.map((item, i) => (
            <div key={i} style={{
              background: "var(--surface)",
              border: "1px solid",
              borderColor: openFaq === i ? "rgba(124,58,237,0.4)" : "var(--border)",
              borderRadius: "14px",
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  color: "var(--text)", fontSize: "15px", fontWeight: "600", gap: "12px",
                }}
              >
                <span>{item.q}</span>
                <span style={{
                  color: "var(--muted)", fontSize: "20px", flexShrink: 0, lineHeight: "1",
                  transform: openFaq === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s",
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", color: "var(--muted)", fontSize: "14px", lineHeight: "1.7" }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin: "0 24px 80px",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
        background: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(99,102,241,0.1))",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: "24px",
        padding: "60px 40px",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: "800", marginBottom: "16px", letterSpacing: "-1px" }}>
          Готов запустить свою платформу?
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
          Скажи нам нишу — покажем демо под твой бизнес
        </p>
        <Link href="/demo" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
          ✨ Хочу демо для своей ниши
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>
          <span className="gradient-text">Univers</span>
          <span style={{ color: "var(--text)" }}> Platform</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "14px", margin: "0 0 16px" }}>Универсальная бизнес-платформа под любую нишу</p>
        <p style={{ color: "var(--muted)", fontSize: "12px", opacity: 0.6 }}>© 2026 Univers Platform</p>
      </footer>

    </div>
  );
}
