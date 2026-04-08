# BACKEND-PLAN.md — Univers Platform
## Архитектурный план бэкенда

**Дата:** 08.04.2026  
**Проект:** Univers Platform — универсальная бизнес-платформа  
**Стек:** Next.js App Router, Supabase, Telegram Bot API, Claude API  

---

## ИТОГИ АРХИТЕКТУРНЫХ РЕШЕНИЙ

### 1. Защита контента
**Выбрано: A + B + C — все три уровня защиты**

| Уровень | Что делает |
|---------|-----------|
| A | Клиент видит только свои данные (изоляция по client_id в БД) |
| B | Правый клик отключён на клиентских страницах |
| C | Server-Side Rendering — исходный код платформы не передаётся клиенту |

### 2. Модель доставки
**Выбрано: все три варианта параллельно**

| Вариант | Описание |
|---------|---------|
| SaaS | Клиент пользуется платформой через браузер, ты управляешь всем |
| White-label | Клиент получает платформу под своим брендом на своём домене |
| Гибрид | SaaS + брендирование: логотип/цвета клиента, но хостинг твой |

### 3. Добавление новых ниш
**Выбрано: через Claude (Вариант Б) + автоматически в будущем**

Сейчас: описываешь нишу → Claude пишет код → деплой в Vercel.  
Потом: клиент сам выбирает нишу при регистрации, платформа адаптируется.

### 4. AI-агент
**Для клиентов бизнеса** — каждый владелец бизнеса настраивает своего агента.  
Агент отвечает на вопросы клиентов этого бизнеса (например, пациентов стоматологии).  
Powered by Claude API. Бизнес задаёт инструкции: "Ты — администратор клиники Улыбка..."

### 5. Telegram-интеграция
**Выбрано: Б + В**

| Вариант | Что делает |
|---------|-----------|
| Б | Уведомления о новых заявках → в Telegram бизнес-владельца |
| В | Telegram как интерфейс — клиент бизнеса пишет боту вместо формы на сайте |

### 6. Оплата внутри платформы
**Выбрано: А + Б (по желанию клиента)**

- **А** — Приём оплаты картой/СБП прямо в платформе (подключаем ЮKassa/Tinkoff Acquiring)
- **Б** — Учёт оплат: отметить "оплачено", выставить счёт, история платежей

Реализуется под запрос клиента, не навязывается всем.

### 7. Масштаб
**Старт: А (1–5 клиентов) → рост до Б (5–20 клиентов)**

Начинаем вручную, растём к автоматизации.

---

## ПЛАН РЕАЛИЗАЦИИ — ПО ФАЗАМ

---

### ФАЗА 1: БАЗА ДАННЫХ (Supabase)
**Срок:** первое, что подключаем  
**Цель:** хранить заявки, пользователей, настройки бизнеса

#### Таблицы в Supabase

```sql
-- Бизнес-клиенты (стоматологии, бьюти-студии и т.д.)
clients (
  id uuid PRIMARY KEY,
  name text,           -- "Стоматология Улыбка"
  niche text,          -- "dentistry"
  owner_email text,
  telegram_chat_id text,
  logo_url text,
  brand_color text,
  domain text,         -- для white-label
  plan text,           -- "basic" / "pro" / "enterprise"
  created_at timestamp
)

-- Пользователи платформы
users (
  id uuid PRIMARY KEY,
  client_id uuid REFERENCES clients(id),
  email text UNIQUE,
  role text,           -- "owner" / "staff" / "customer"
  name text,
  telegram_id text,
  created_at timestamp
)

-- Заявки/лиды (входящие от клиентов бизнеса)
leads (
  id uuid PRIMARY KEY,
  client_id uuid REFERENCES clients(id),
  name text,
  phone text,
  niche text,
  status text,         -- "new" / "in_progress" / "done"
  source text,         -- "landing" / "telegram" / "form"
  created_at timestamp
)

-- Платежи (опционально)
payments (
  id uuid PRIMARY KEY,
  client_id uuid REFERENCES clients(id),
  lead_id uuid REFERENCES leads(id),
  amount integer,      -- в копейках
  status text,         -- "pending" / "paid" / "cancelled"
  method text,         -- "card" / "sbp" / "cash"
  created_at timestamp
)

-- AI-агент настройки
agent_configs (
  id uuid PRIMARY KEY,
  client_id uuid REFERENCES clients(id),
  system_prompt text,  -- инструкция для Claude
  welcome_message text,
  is_active boolean,
  created_at timestamp
)
```

---

### ФАЗА 2: АВТОРИЗАЦИЯ
**Цель:** владелец бизнеса входит, видит только свои данные

#### Страницы
- `/login` — вход по email + пароль (Supabase Auth)
- `/register` — регистрация нового бизнеса (форма + создание записи в clients)
- `/dashboard` — главная панель после входа (роутинг по роли)

#### Роли
```
owner  → видит все данные своего бизнеса, настройки, статистику
staff  → видит заявки и расписание, не видит финансы и настройки
customer → видит только своё расписание и историю (в будущем)
```

#### Реализация
- Supabase Auth (встроенный, без своего сервера)
- Row Level Security (RLS) — каждый user видит только строки с его client_id
- Middleware Next.js — защита всех роутов `/dashboard/*`

---

### ФАЗА 3: API ENDPOINTS
**Цель:** бизнес-логика через Next.js API Routes

| Endpoint | Метод | Что делает |
|----------|-------|-----------|
| `/api/submit` | POST | Принять заявку → Supabase + Telegram ✅ (готово) |
| `/api/leads` | GET | Список заявок для dashboard |
| `/api/leads/[id]` | PATCH | Обновить статус заявки |
| `/api/agent/chat` | POST | Ответ AI-агента через Claude API |
| `/api/payments/create` | POST | Создать счёт на оплату |
| `/api/payments/webhook` | POST | Вебхук от платёжной системы |
| `/api/clients/me` | GET | Данные текущего бизнеса |
| `/api/clients/settings` | PATCH | Обновить настройки бизнеса |

---

### ФАЗА 4: AI-АГЕНТ
**Цель:** каждый бизнес настраивает своего чат-агента

#### Как работает
1. Владелец бизнеса пишет инструкцию: "Ты — администратор клиники. Записываешь на приём..."
2. Клиент бизнеса открывает чат на сайте → пишет вопрос
3. Сообщение уходит в `/api/agent/chat`
4. Claude API получает system_prompt из agent_configs + сообщение клиента
5. Claude отвечает → ответ возвращается в чат

#### Код endpoint (черновик)
```typescript
// /api/agent/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const { message, clientId } = await req.json();
  
  // Получить настройки агента из Supabase
  const config = await supabase
    .from("agent_configs")
    .select("*")
    .eq("client_id", clientId)
    .single();
  
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: config.data.system_prompt,
    messages: [{ role: "user", content: message }],
  });
  
  return NextResponse.json({ reply: response.content[0].text });
}
```

---

### ФАЗА 5: TELEGRAM-БОТ (Вариант В)
**Цель:** клиент пишет боту вместо формы на сайте

#### Как работает
1. Клиент бизнеса пишет в Telegram-бот
2. Бот принимает сообщение через webhook
3. Отправляет в `/api/telegram/webhook`
4. Claude обрабатывает → отвечает через Bot API
5. Заявка создаётся в Supabase автоматически

#### Endpoint
```
POST /api/telegram/webhook
```

Настройка: `setWebhook` на https://univers-platform.vercel.app/api/telegram/webhook

---

### ФАЗА 6: ОПЛАТА (по запросу клиента)
**Цель:** приём карты/СБП или учёт оплат вручную

#### Вариант А — Онлайн-оплата
- Интеграция с **Tinkoff Acquiring** или **ЮKassa**
- Кнопка "Оплатить" → редирект на страницу оплаты → вебхук о результате

#### Вариант Б — Учёт вручную
- В dashboard: список заявок со статусом оплаты
- Кнопка "Отметить оплаченным" → статус меняется в Supabase
- Выставление счёта PDF (в будущем)

---

## ПОРЯДОК ВНЕДРЕНИЯ (рекомендуемый)

```
Шаг 1  →  Supabase: создать проект, таблицы (leads, clients, users)
Шаг 2  →  /api/submit: обновить — сохранять заявки в Supabase (сейчас только Telegram)
Шаг 3  →  /login и /register: авторизация через Supabase Auth
Шаг 4  →  /dashboard: защищённая панель, список заявок из Supabase
Шаг 5  →  Middleware: защита роутов, проверка роли
Шаг 6  →  AI-агент: Claude API + настройки в dashboard
Шаг 7  →  Telegram Вариант В: webhook, бот как интерфейс
Шаг 8  →  Оплата: по запросу первых клиентов
```

---

## ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ (итоговый список)

```env
# Уже есть
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# Добавить (Supabase)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Добавить (Claude API)
ANTHROPIC_API_KEY=...

# Добавить (оплата, позже)
TINKOFF_TERMINAL_KEY=...
TINKOFF_SECRET_KEY=...
```

---

## ЗАВИСИМОСТИ (установить позже)

```bash
# Supabase клиент
npm install @supabase/supabase-js @supabase/ssr

# Claude API
npm install @anthropic-ai/sdk

# PDF для счетов (позже)
npm install @react-pdf/renderer
```

---

*Последнее обновление: 08.04.2026*  
*Статус: план утверждён, реализация по фазам*
