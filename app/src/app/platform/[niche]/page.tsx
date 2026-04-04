"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

interface MenuItem { icon: string; label: string; }
interface Stat { icon: string; value: string; label: string; trend: string; up: boolean; }
interface Row { avatar: string; name: string; detail: string; time: string; status: string; statusColor: string; }

interface NicheConfig {
  name: string;
  icon: string;
  tagline: string;
  menu: MenuItem[];
  stats: Stat[];
  tableTitle: string;
  tableHeaders: string[];
  rows: Row[];
  kanban: { title: string; color: string; items: string[] }[];
}

const niches: Record<string, NicheConfig> = {
  dentistry: {
    name: "Стоматология",
    icon: "🦷",
    tagline: "Управление клиникой",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "📅", label: "Запись" },
      { icon: "🗂️", label: "Пациенты" },
      { icon: "📊", label: "CRM" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "💳", label: "Оплаты" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "📅", value: "24", label: "Записи сегодня", trend: "+3 от вчера", up: true },
      { icon: "👥", value: "1 247", label: "Пациентов в базе", trend: "+12 за неделю", up: true },
      { icon: "🔔", value: "7", label: "Новых заявок", trend: "требуют ответа", up: false },
      { icon: "💰", value: "₽ 87 400", label: "Выручка сегодня", trend: "+18% к прошлой неделе", up: true },
    ],
    tableTitle: "Расписание на сегодня",
    tableHeaders: ["Пациент", "Врач", "Услуга", "Время", "Статус"],
    rows: [
      { avatar: "АС", name: "Анна Смирнова", detail: "Др. Петров — Чистка зубов", time: "09:00", status: "Принят", statusColor: "#22c55e" },
      { avatar: "МК", name: "Михаил Козлов", detail: "Др. Иванова — Пломбирование", time: "10:30", status: "Ожидает", statusColor: "#f59e0b" },
      { avatar: "ЕВ", name: "Елена Волкова", detail: "Др. Петров — Удаление", time: "12:00", status: "Подтверждён", statusColor: "#6366f1" },
      { avatar: "ДН", name: "Дмитрий Новиков", detail: "Др. Сидорова — Брекеты", time: "14:00", status: "Ожидает", statusColor: "#f59e0b" },
      { avatar: "ОМ", name: "Ольга Морозова", detail: "Др. Иванова — Протезирование", time: "15:30", status: "Подтверждён", statusColor: "#6366f1" },
      { avatar: "АК", name: "Александр Кузнецов", detail: "Др. Петров — Имплант", time: "17:00", status: "Новый", statusColor: "#a855f7" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Иванов И. — Консультация", "Петрова М. — Чистка", "Сидоров А. — Боль"] },
      { title: "Записаны", color: "#6366f1", items: ["Козлов Д. 15:00", "Волкова Е. 16:30", "Морозова О. 18:00"] },
      { title: "Приняты", color: "#22c55e", items: ["Смирнова А. ✓", "Новиков В. ✓"] },
      { title: "Оплачено", color: "#06b6d4", items: ["Кузнецов А. — ₽12 400", "Лебедева Н. — ₽8 900"] },
    ],
  },

  beauty: {
    name: "Бьюти-студия",
    icon: "💅",
    tagline: "Управление студией",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "📅", label: "Запись" },
      { icon: "👩‍🎨", label: "Мастера" },
      { icon: "📊", label: "CRM" },
      { icon: "🖼️", label: "Портфолио" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "📅", value: "18", label: "Записей сегодня", trend: "+5 от вчера", up: true },
      { icon: "👥", value: "834", label: "Клиентов в базе", trend: "+8 за неделю", up: true },
      { icon: "⭐", value: "4.9", label: "Средний рейтинг", trend: "128 отзывов", up: true },
      { icon: "💰", value: "₽ 54 200", label: "Выручка сегодня", trend: "+22% к прошлой неделе", up: true },
    ],
    tableTitle: "Записи на сегодня",
    tableHeaders: ["Клиент", "Мастер", "Услуга", "Время", "Статус"],
    rows: [
      { avatar: "КЛ", name: "Кира Лебедева", detail: "Мастер Аня — Маникюр", time: "10:00", status: "Принята", statusColor: "#22c55e" },
      { avatar: "ВС", name: "Вера Соколова", detail: "Мастер Катя — Педикюр", time: "11:00", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "НМ", name: "Наталья Михайлова", detail: "Мастер Аня — Ресницы", time: "12:30", status: "Ожидает", statusColor: "#6366f1" },
      { avatar: "ТП", name: "Татьяна Попова", detail: "Мастер Маша — Брови", time: "14:00", status: "Подтверждена", statusColor: "#6366f1" },
      { avatar: "ИА", name: "Ирина Алексеева", detail: "Мастер Катя — Окрашивание", time: "15:30", status: "Ожидает", statusColor: "#f59e0b" },
      { avatar: "СЯ", name: "Светлана Яковлева", detail: "Мастер Маша — Маникюр", time: "17:00", status: "Новая", statusColor: "#a855f7" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Козлова — Маникюр", "Петрова — Ресницы", "Иванова — Брови"] },
      { title: "Записаны", color: "#6366f1", items: ["Смирнова 14:00", "Новикова 16:00", "Федорова 18:30"] },
      { title: "В работе", color: "#f59e0b", items: ["Соколова (мастер Катя)", "Лебедева (мастер Аня)"] },
      { title: "Завершено", color: "#22c55e", items: ["Лебедева К. — ₽2 800", "Михайлова — ₽4 500"] },
    ],
  },

  "real-estate": {
    name: "Недвижимость",
    icon: "🏠",
    tagline: "Агентство недвижимости",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🏘️", label: "Объекты" },
      { icon: "📋", label: "Заявки" },
      { icon: "👔", label: "Агенты" },
      { icon: "📊", label: "CRM" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "🏘️", value: "147", label: "Объектов в базе", trend: "+5 новых", up: true },
      { icon: "📋", value: "34", label: "Активных заявок", trend: "8 горячих", up: true },
      { icon: "🤝", value: "12", label: "Сделок в месяц", trend: "+4 к прошлому", up: true },
      { icon: "💰", value: "₽ 2.4 млн", label: "Комиссия в месяц", trend: "+31% к плану", up: true },
    ],
    tableTitle: "Активные заявки",
    tableHeaders: ["Клиент", "Агент", "Запрос", "Бюджет", "Статус"],
    rows: [
      { avatar: "АС", name: "Андрей Соколов", detail: "Агент Петрова — 2-комн, Центр", time: "₽ 8.5 млн", status: "Горячий", statusColor: "#ef4444" },
      { avatar: "МИ", name: "Мария Иванова", detail: "Агент Козлов — Студия, Юг", time: "₽ 4.2 млн", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "ДВ", name: "Денис Воронов", detail: "Агент Петрова — 3-комн, Север", time: "₽ 12 млн", status: "Показ", statusColor: "#6366f1" },
      { avatar: "НК", name: "Нина Казакова", detail: "Агент Сидоров — Дом, пригород", time: "₽ 18 млн", status: "Торг", statusColor: "#a855f7" },
      { avatar: "РЛ", name: "Роман Лазарев", detail: "Агент Козлов — 1-комн, Запад", time: "₽ 5.8 млн", status: "Новый", statusColor: "#22c55e" },
      { avatar: "ОЗ", name: "Ольга Зайцева", detail: "Агент Сидоров — Коммерция", time: "₽ 25 млн", status: "Встреча", statusColor: "#06b6d4" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Соколов — квартира", "Зайцева — офис", "Морозов — дом"] },
      { title: "Подбор объектов", color: "#6366f1", items: ["Иванова (5 вариантов)", "Лазарев (3 варианта)"] },
      { title: "Показы", color: "#f59e0b", items: ["Воронов — ул. Ленина 14", "Казакова — Коттедж"] },
      { title: "Сделка", color: "#22c55e", items: ["Петров — Договор", "Сидорова — Аванс получен"] },
    ],
  },

  restaurant: {
    name: "Ресторан",
    icon: "🍕",
    tagline: "Управление рестораном",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🍽️", label: "Меню" },
      { icon: "🛒", label: "Заказы" },
      { icon: "🪑", label: "Бронирование" },
      { icon: "🚴", label: "Доставка" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "🛒", value: "63", label: "Заказов сегодня", trend: "+11 от вчера", up: true },
      { icon: "🪑", value: "12", label: "Броней на вечер", trend: "из 15 столиков", up: false },
      { icon: "🚴", value: "28", label: "Доставок", trend: "среднее 34 мин", up: true },
      { icon: "💰", value: "₽ 124 500", label: "Выручка сегодня", trend: "+15% к прошлой неделе", up: true },
    ],
    tableTitle: "Текущие заказы",
    tableHeaders: ["Заказ", "Клиент", "Состав", "Сумма", "Статус"],
    rows: [
      { avatar: "🛒", name: "#1047", detail: "Иван П. — Пицца Маргарита, Кола", time: "₽ 890", status: "Готовится", statusColor: "#f59e0b" },
      { avatar: "🚴", name: "#1048", detail: "Мария С. — Бургер, Картошка фри", time: "₽ 1 240", status: "Доставка", statusColor: "#6366f1" },
      { avatar: "🪑", name: "#1049", detail: "Стол 4 — Паста, Стейк, Вино", time: "₽ 4 800", status: "Подан", statusColor: "#22c55e" },
      { avatar: "🛒", name: "#1050", detail: "Дмитрий К. — Суши сет", time: "₽ 2 200", status: "Готовится", statusColor: "#f59e0b" },
      { avatar: "🚴", name: "#1051", detail: "Анна В. — Пицца BBQ, Тирамису", time: "₽ 1 650", status: "Ожидает курьера", statusColor: "#a855f7" },
      { avatar: "🪑", name: "#1052", detail: "Стол 7 — Рыба, Салат, Сок", time: "₽ 3 100", status: "Принят", statusColor: "#06b6d4" },
    ],
    kanban: [
      { title: "Новые заказы", color: "#a855f7", items: ["#1053 — доставка", "#1054 — зал", "#1055 — самовывоз"] },
      { title: "На кухне", color: "#f59e0b", items: ["#1047 — Пицца (8 мин)", "#1050 — Суши (12 мин)", "#1052 — Рыба"] },
      { title: "Доставляется", color: "#6366f1", items: ["#1048 — курьер Алёша", "#1051 — курьер Макс"] },
      { title: "Завершено", color: "#22c55e", items: ["#1045 — ₽ 2 400", "#1046 — ₽ 890", "#1049 — ₽ 4 800"] },
    ],
  },

  school: {
    name: "Онлайн-школа",
    icon: "📚",
    tagline: "Управление школой",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🎓", label: "Курсы" },
      { icon: "👥", label: "Ученики" },
      { icon: "📝", label: "Задания" },
      { icon: "🎥", label: "Вебинары" },
      { icon: "🤖", label: "AI-куратор" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "👥", value: "2 834", label: "Учеников всего", trend: "+124 за месяц", up: true },
      { icon: "🎓", value: "14", label: "Активных курсов", trend: "+2 новых", up: true },
      { icon: "📝", value: "48", label: "Заданий на проверке", trend: "нужен ответ", up: false },
      { icon: "💰", value: "₽ 418 000", label: "Выручка за месяц", trend: "+41% к прошлому", up: true },
    ],
    tableTitle: "Активность учеников сегодня",
    tableHeaders: ["Ученик", "Курс", "Прогресс", "Последнее действие", "Статус"],
    rows: [
      { avatar: "АП", name: "Алиса Павлова", detail: "Курс: Python с нуля", time: "72% пройдено", status: "Активен", statusColor: "#22c55e" },
      { avatar: "ИС", name: "Игорь Степанов", detail: "Курс: Маркетинг", time: "45% пройдено", status: "Задание сдано", statusColor: "#6366f1" },
      { avatar: "МФ", name: "Маша Фролова", detail: "Курс: Дизайн UI/UX", time: "91% пройдено", status: "Финал", statusColor: "#a855f7" },
      { avatar: "СО", name: "Сергей Орлов", detail: "Курс: Python с нуля", time: "18% пройдено", status: "Неактивен", statusColor: "#f59e0b" },
      { avatar: "НС", name: "Надя Соловьёва", detail: "Курс: Продажи", time: "63% пройдено", status: "На задании", statusColor: "#06b6d4" },
      { avatar: "РМ", name: "Рома Морозов", detail: "Курс: Маркетинг", time: "100% пройдено", status: "Сертификат", statusColor: "#22c55e" },
    ],
    kanban: [
      { title: "Задания на проверке", color: "#a855f7", items: ["Степанов — Урок 12", "Соловьёва — Урок 8", "Орлов — Урок 4"] },
      { title: "Проверены", color: "#6366f1", items: ["Павлова — Урок 15 ✓", "Фролова — Урок 22 ✓"] },
      { title: "Нужна поддержка", color: "#f59e0b", items: ["Орлов — 14 дней нет входа", "Васин — вопрос по уроку"] },
      { title: "Завершили курс", color: "#22c55e", items: ["Морозов Р. — Сертификат", "Ким А. — Сертификат"] },
    ],
  },

  fitness: {
    name: "Фитнес-клуб",
    icon: "🏋️",
    tagline: "Управление клубом",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🗓️", label: "Расписание" },
      { icon: "👥", label: "Клиенты" },
      { icon: "🏋️", label: "Тренеры" },
      { icon: "🎟️", label: "Абонементы" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "🏃", value: "87", label: "Посещений сегодня", trend: "+14 от вчера", up: true },
      { icon: "👥", value: "1 103", label: "Активных клиентов", trend: "с абонементом", up: true },
      { icon: "🎟️", value: "23", label: "Новых абонементов", trend: "+8 за неделю", up: true },
      { icon: "💰", value: "₽ 218 000", label: "Выручка за месяц", trend: "+19% к плану", up: true },
    ],
    tableTitle: "Расписание на сегодня",
    tableHeaders: ["Занятие", "Тренер", "Время", "Мест занято", "Статус"],
    rows: [
      { avatar: "🧘", name: "Йога утренняя", detail: "Тренер Анна Кова", time: "08:00", status: "Прошло (12/15)", statusColor: "#22c55e" },
      { avatar: "🏃", name: "Кардио-интервал", detail: "Тренер Максим Ов", time: "10:00", status: "Идёт (18/20)", statusColor: "#f59e0b" },
      { avatar: "💪", name: "Силовая тренировка", detail: "Тренер Денис Ив", time: "12:00", status: "Запись (8/15)", statusColor: "#6366f1" },
      { avatar: "🤸", name: "Стретчинг", detail: "Тренер Анна Кова", time: "14:00", status: "Запись (5/12)", statusColor: "#6366f1" },
      { avatar: "🥊", name: "Бокс", detail: "Тренер Максим Ов", time: "17:00", status: "Запись (11/15)", statusColor: "#6366f1" },
      { avatar: "🧘", name: "Йога вечерняя", detail: "Тренер Анна Кова", time: "19:30", status: "Запись (6/12)", statusColor: "#a855f7" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Иванов — Абонемент", "Петрова — Пробная", "Сидоров — Тренер"] },
      { title: "Оформляются", color: "#6366f1", items: ["Козлов — договор", "Лебедева — оплата"] },
      { title: "Активны", color: "#22c55e", items: ["1 103 клиента с абонементами"] },
      { title: "Заканчивается", color: "#f59e0b", items: ["Морозов — 3 дня", "Волков — 5 дней", "Зайцева — 7 дней"] },
    ],
  },

  autoservice: {
    name: "Автосервис",
    icon: "🚗",
    tagline: "Управление сервисом",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🔧", label: "Заявки" },
      { icon: "🚗", label: "Автомобили" },
      { icon: "👥", label: "Клиенты" },
      { icon: "📊", label: "CRM" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "🔧", value: "11", label: "Авто в работе", trend: "2 ждут запчастей", up: false },
      { icon: "✅", value: "6", label: "Готово сегодня", trend: "ждут владельцев", up: true },
      { icon: "📋", value: "19", label: "Заявок на неделю", trend: "+4 от прошлой", up: true },
      { icon: "💰", value: "₽ 94 800", label: "Выручка за неделю", trend: "+8% к плану", up: true },
    ],
    tableTitle: "Авто в работе",
    tableHeaders: ["Клиент", "Автомобиль", "Работа", "Мастер", "Статус"],
    rows: [
      { avatar: "АП", name: "Андрей Панов", detail: "Toyota Camry, A123BC — Замена масла", time: "Мастер Сергей", status: "Готово", statusColor: "#22c55e" },
      { avatar: "ОС", name: "Оксана Семёнова", detail: "Kia Rio, В234СД — Тормоза", time: "Мастер Алёша", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "ВК", name: "Виктор Кравцов", detail: "BMW X5, Е567КМ — Подвеска", time: "Мастер Игорь", status: "Диагностика", statusColor: "#6366f1" },
      { avatar: "ТН", name: "Тимур Назаров", detail: "Lada Vesta, Р890НО — Движок", time: "Мастер Сергей", status: "Ждёт запчастей", statusColor: "#ef4444" },
      { avatar: "ЛВ", name: "Людмила Власова", detail: "Hyundai Tucson, С123ТУ — Кузов", time: "Мастер Алёша", status: "Принята", statusColor: "#a855f7" },
      { avatar: "РМ", name: "Роман Мельников", detail: "Renault Duster, Х456ФХ — ТО", time: "Мастер Игорь", status: "В работе", statusColor: "#f59e0b" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Гришин — Замена резины", "Ефимова — ТО", "Захаров — Стук"] },
      { title: "В работе", color: "#f59e0b", items: ["Семёнова — тормоза", "Мельников — ТО", "Власова — кузов"] },
      { title: "Готово", color: "#22c55e", items: ["Панов — позвонить!", "Иванов — позвонить!", "Сидорова — забрала"] },
      { title: "Ждёт запчастей", color: "#ef4444", items: ["Назаров — Движок (2 дня)", "Кравцов — стойки (завтра)"] },
    ],
  },

  construction: {
    name: "Строительство",
    icon: "🏗️",
    tagline: "Управление объектами",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "🏗️", label: "Объекты" },
      { icon: "📋", label: "Заявки" },
      { icon: "👷", label: "Бригады" },
      { icon: "💰", label: "Сметы" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "🏗️", value: "8", label: "Объектов в работе", trend: "2 сдаются в мае", up: true },
      { icon: "📋", value: "14", label: "Новых заявок", trend: "+3 за неделю", up: true },
      { icon: "👷", value: "47", label: "Рабочих на объектах", trend: "3 бригады", up: true },
      { icon: "💰", value: "₽ 4.8 млн", label: "Выручка в мае", trend: "+23% к плану", up: true },
    ],
    tableTitle: "Текущие объекты",
    tableHeaders: ["Объект", "Клиент", "Этап", "Бригада", "Статус"],
    rows: [
      { avatar: "🏠", name: "Коттедж, Лесная 12", detail: "Морозов А.П. — Кровля", time: "Бригада Иванова", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "🏢", name: "Офис, пр. Мира 45", detail: "ООО Альфа — Отделка", time: "Бригада Петрова", status: "Финальный", statusColor: "#22c55e" },
      { avatar: "🏠", name: "Дом, ул. Садовая", detail: "Сидорова К.В. — Фундамент", time: "Бригада Козлова", status: "Начало", statusColor: "#6366f1" },
      { avatar: "🏪", name: "Магазин, ул. Рабочая", detail: "ИП Волков — Коммуникации", time: "Бригада Иванова", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "🏠", name: "Таунхаус, пос. Малиновка", detail: "Новиков Д.С. — Стены", time: "Бригада Козлова", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "🏢", name: "Склад, Промзона 7", detail: "ООО Бета — Проектирование", time: "—", status: "Согласование", statusColor: "#a855f7" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Лебедев — Баня 60м²", "Зайцева — Перепланировка", "Орлов — Ремонт офиса"] },
      { title: "Смета / Договор", color: "#6366f1", items: ["Волков — ждёт смету", "Склад Бета — согласование"] },
      { title: "В работе", color: "#f59e0b", items: ["Коттедж Морозова", "Магазин Волкова", "Таунхаус Новикова"] },
      { title: "Сдача", color: "#22c55e", items: ["Офис Альфа — акт 20 апр", "Дом Петровых — акт май"] },
    ],
  },

  coaching: {
    name: "Психологи и коучи",
    icon: "🧠",
    tagline: "Управление практикой",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "📅", label: "Сессии" },
      { icon: "👥", label: "Клиенты" },
      { icon: "📝", label: "Задания" },
      { icon: "💬", label: "Чат" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "📅", value: "9", label: "Сессий сегодня", trend: "+1 от вчера", up: true },
      { icon: "👥", value: "127", label: "Клиентов в работе", trend: "4 новых на неделе", up: true },
      { icon: "📝", value: "21", label: "Заданий ожидает", trend: "ответ клиентов", up: false },
      { icon: "💰", value: "₽ 186 000", label: "Выручка за месяц", trend: "+28% к прошлому", up: true },
    ],
    tableTitle: "Сессии на сегодня",
    tableHeaders: ["Клиент", "Специалист", "Формат", "Время", "Статус"],
    rows: [
      { avatar: "МА", name: "Мария Антонова", detail: "Психолог Ирина К. — Онлайн", time: "10:00", status: "Завершена", statusColor: "#22c55e" },
      { avatar: "СИ", name: "Сергей Иванов", detail: "Коуч Алексей П. — Оффлайн", time: "11:30", status: "Идёт", statusColor: "#f59e0b" },
      { avatar: "ЕК", name: "Екатерина Комова", detail: "Психолог Ирина К. — Онлайн", time: "13:00", status: "Подтверждена", statusColor: "#6366f1" },
      { avatar: "ДФ", name: "Дмитрий Фёдоров", detail: "Коуч Алексей П. — Онлайн", time: "15:00", status: "Подтверждена", statusColor: "#6366f1" },
      { avatar: "АП", name: "Анна Петрова", detail: "Психолог Ирина К. — Онлайн", time: "17:00", status: "Ожидает", statusColor: "#a855f7" },
      { avatar: "ВС", name: "Виктория Сова", detail: "Коуч Алексей П. — Онлайн", time: "19:00", status: "Новая", statusColor: "#06b6d4" },
    ],
    kanban: [
      { title: "Новые клиенты", color: "#a855f7", items: ["Сова В. — запрос", "Орлов М. — анкета", "Лисова — консультация"] },
      { title: "Первичная сессия", color: "#6366f1", items: ["Петрова А. — сессия 1", "Фёдоров Д. — сессия 1"] },
      { title: "В работе", color: "#22c55e", items: ["Антонова М. — сессия 12", "Иванов С. — коучинг", "Комова Е. — сессия 5"] },
      { title: "Задания не сданы", color: "#f59e0b", items: ["Смирнов — 7 дней", "Волкова — задание 3", "Казаков — ответить"] },
    ],
  },

  enterprise: {
    name: "Корпорации",
    icon: "🏢",
    tagline: "Enterprise-платформа",
    menu: [
      { icon: "🏠", label: "Дашборд" },
      { icon: "👥", label: "Пользователи" },
      { icon: "🏢", label: "Отделы" },
      { icon: "📊", label: "Аналитика" },
      { icon: "🔐", label: "Безопасность" },
      { icon: "🔗", label: "Интеграции" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "👥", value: "2 847", label: "Пользователей", trend: "в 4 отделах", up: true },
      { icon: "🏢", value: "12", label: "Филиалов / отделов", trend: "3 страны", up: true },
      { icon: "🔒", value: "99.97%", label: "Uptime платформы", trend: "за 30 дней", up: true },
      { icon: "📊", value: "147K", label: "Действий в системе", trend: "за сегодня", up: true },
    ],
    tableTitle: "Последние действия (Audit Log)",
    tableHeaders: ["Пользователь", "Отдел", "Действие", "Время", "Статус"],
    rows: [
      { avatar: "АИ", name: "Алексей Иванов", detail: "Отдел продаж — Экспорт клиентской базы", time: "14:32", status: "Разрешено", statusColor: "#22c55e" },
      { avatar: "МП", name: "Мария Петрова", detail: "HR — Создание пользователя", time: "14:18", status: "Разрешено", statusColor: "#22c55e" },
      { avatar: "АК", name: "Анон. IP: 195.x.x.x", detail: "Внешний — Попытка входа", time: "14:05", status: "Заблокировано", statusColor: "#ef4444" },
      { avatar: "СК", name: "Сергей Козлов", detail: "IT — Изменение прав доступа", time: "13:47", status: "Требует подтв.", statusColor: "#f59e0b" },
      { avatar: "ЕВ", name: "Елена Власова", detail: "Маркетинг — Загрузка отчёта", time: "13:22", status: "Разрешено", statusColor: "#22c55e" },
      { avatar: "ДМ", name: "Денис Морозов", detail: "Финансы — Просмотр договоров", time: "13:10", status: "Разрешено", statusColor: "#22c55e" },
    ],
    kanban: [
      { title: "Задачи IT", color: "#6366f1", items: ["Настроить SSO для Казахстан", "Обновить роли — Финансы", "Интеграция с 1С v8.3"] },
      { title: "На согласовании", color: "#f59e0b", items: ["Права Козлова С.", "Добавление отдела ЮАО"] },
      { title: "В работе", color: "#a855f7", items: ["Онбординг 34 новых сотр.", "White-label для партнёра"] },
      { title: "Завершено", color: "#22c55e", items: ["SAML настроен ✓", "Аудит Q1 закрыт ✓"] },
    ],
  },

  repair: {
    name: "Ремонт",
    icon: "🔧",
    tagline: "Управление заявками",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "📋", label: "Заявки" },
      { icon: "👷", label: "Мастера" },
      { icon: "💰", label: "Сметы" },
      { icon: "📸", label: "Фото" },
      { icon: "🤖", label: "AI-агент" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "📋", value: "14", label: "Заявок сегодня", trend: "+4 от вчера", up: true },
      { icon: "👷", value: "8", label: "Мастеров в работе", trend: "из 12 активных", up: true },
      { icon: "⏱️", value: "2.4 ч", label: "Среднее время выезда", trend: "−0.5 ч за неделю", up: true },
      { icon: "💰", value: "₽ 142 800", label: "Выручка за неделю", trend: "+31% к прошлой", up: true },
    ],
    tableTitle: "Активные заявки",
    tableHeaders: ["Клиент", "Адрес", "Тип работ", "Мастер", "Статус"],
    rows: [
      { avatar: "АС", name: "Алексей Смирнов", detail: "ул. Ленина, 12 — Замена проводки", time: "09:00", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "МВ", name: "Мария Воронова", detail: "пр. Мира, 45 — Установка сантехники", time: "10:30", status: "Выехал", statusColor: "#6366f1" },
      { avatar: "ДК", name: "Дмитрий Карпов", detail: "ул. Садовая, 7 — Укладка плитки", time: "12:00", status: "Принята", statusColor: "#a855f7" },
      { avatar: "НЛ", name: "Наталья Лапина", detail: "пр. Победы, 33 — Замена окон", time: "14:00", status: "Ожидает", statusColor: "#9ca3af" },
      { avatar: "ОК", name: "Олег Козырев", detail: "ул. Гагарина, 19 — Электрика", time: "15:30", status: "В работе", statusColor: "#f59e0b" },
      { avatar: "ТМ", name: "Татьяна Макарова", detail: "ул. Цветочная, 3 — Сантехника", time: "17:00", status: "Новая", statusColor: "#22c55e" },
    ],
    kanban: [
      { title: "Новые заявки", color: "#a855f7", items: ["Смирнов — Электрика", "Орлов — Плитка ванная", "Федорова — Замена труб"] },
      { title: "Назначен мастер", color: "#6366f1", items: ["Карпов → мастер Виктор", "Лапина → мастер Иван", "Козырев → мастер Сергей"] },
      { title: "В работе", color: "#f59e0b", items: ["Смирнов А. (Электрика)", "Воронова М. (Сантехника)"] },
      { title: "Завершено", color: "#22c55e", items: ["Петров — ₽18 500 ✓", "Соколова — ₽9 200 ✓"] },
    ],
  },

  tutoring: {
    name: "Репетиторство",
    icon: "✏️",
    tagline: "Управление занятиями",
    menu: [
      { icon: "🏠", label: "Главная" },
      { icon: "📅", label: "Расписание" },
      { icon: "👤", label: "Ученики" },
      { icon: "📝", label: "Задания" },
      { icon: "💳", label: "Оплата" },
      { icon: "🤖", label: "AI-бот" },
      { icon: "⚙️", label: "Настройки" },
    ],
    stats: [
      { icon: "📅", value: "11", label: "Занятий сегодня", trend: "+2 от вчера", up: true },
      { icon: "👤", value: "64", label: "Учеников в базе", trend: "+5 за месяц", up: true },
      { icon: "📝", value: "23", label: "Заданий на проверке", trend: "требуют ответа", up: false },
      { icon: "💰", value: "₽ 84 000", label: "Выручка за месяц", trend: "+18% к прошлому", up: true },
    ],
    tableTitle: "Расписание на сегодня",
    tableHeaders: ["Ученик", "Предмет", "Преподаватель", "Время", "Статус"],
    rows: [
      { avatar: "АН", name: "Артём Никитин", detail: "Математика ЕГЭ — Иванова Е.А.", time: "09:00", status: "Завершено", statusColor: "#22c55e" },
      { avatar: "СМ", name: "Соня Морозова", detail: "Английский язык — Петров К.В.", time: "10:30", status: "Идёт", statusColor: "#f59e0b" },
      { avatar: "КЛ", name: "Кирилл Лебедев", detail: "Физика — Сидорова Н.И.", time: "12:00", status: "Подтверждено", statusColor: "#6366f1" },
      { avatar: "ДВ", name: "Даша Васильева", detail: "Русский язык — Иванова Е.А.", time: "14:00", status: "Ожидает", statusColor: "#9ca3af" },
      { avatar: "МК", name: "Максим Козлов", detail: "Химия — Петров К.В.", time: "15:30", status: "Подтверждено", statusColor: "#6366f1" },
      { avatar: "АП", name: "Аня Попова", detail: "История — Сидорова Н.И.", time: "17:00", status: "Новое", statusColor: "#a855f7" },
    ],
    kanban: [
      { title: "Новые записи", color: "#a855f7", items: ["Орлов — Математика", "Крылова — Английский", "Семёнов — Физика"] },
      { title: "Подтверждено", color: "#6366f1", items: ["Лебедев К. 12:00", "Козлов М. 15:30", "Попова А. 17:00"] },
      { title: "Идёт занятие", color: "#f59e0b", items: ["Морозова С. (Петров К.В.)"] },
      { title: "Завершено сегодня", color: "#22c55e", items: ["Никитин А. — ₽2 000 ✓", "Смирнова В. — ₽1 800 ✓"] },
    ],
  },
};

export default function PlatformPage() {
  const params = useParams();
  const slug = params.niche as string;
  const config = niches[slug];
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeTab, setActiveTab] = useState<"table" | "kanban">("table");

  if (!config) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "48px" }}>🔍</div>
        <h1 style={{ color: "var(--text)", fontWeight: "800" }}>Ниша не найдена</h1>
        <Link href="/" className="btn-primary" style={{ padding: "12px 28px" }}>← На главную</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "#0d0d15",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "0",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "-0.3px", marginBottom: "2px" }}>
            <span className="gradient-text">Univers</span>
            <span style={{ color: "var(--text)" }}> Platform</span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--muted)" }}>{config.icon} {config.tagline}</div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {config.menu.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 10px",
                borderRadius: "10px",
                border: "none",
                background: activeMenu === i ? "rgba(124,58,237,0.15)" : "transparent",
                color: activeMenu === i ? "#a855f7" : "var(--muted)",
                fontSize: "14px",
                fontWeight: activeMenu === i ? "600" : "400",
                cursor: "pointer",
                textAlign: "left",
                marginBottom: "2px",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/demo"
            style={{
              display: "block",
              background: "linear-gradient(135deg,#7c3aed,#6366f1)",
              color: "white",
              padding: "10px 12px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "600",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            ✨ Хочу такую платформу
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOP BAR */}
        <header style={{
          height: "56px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/" style={{ color: "var(--muted)", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              ← На главную
            </Link>
            <span style={{ color: "var(--border)" }}>|</span>
            <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>
              {config.icon} {config.name} — Демо-платформа
            </span>
            <span style={{
              background: "rgba(124,58,237,0.15)",
              color: "#a855f7",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "100px",
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: "700",
            }}>ДЕМО</span>
          </div>
          <Link href="/demo" className="btn-primary" style={{ padding: "8px 18px", fontSize: "13px" }}>
            Хочу такую →
          </Link>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px", marginBottom: "24px" }}>
            {config.stats.map((stat) => (
              <div key={stat.label} style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "22px" }}>{stat.icon}</span>
                  <span style={{
                    fontSize: "11px",
                    color: stat.up ? "#22c55e" : "var(--muted)",
                    background: stat.up ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)",
                    borderRadius: "100px",
                    padding: "2px 8px",
                  }}>{stat.trend}</span>
                </div>
                <div style={{
                  fontSize: "28px", fontWeight: "900",
                  background: "linear-gradient(135deg,#a855f7,#6366f1)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  marginBottom: "4px", lineHeight: "1.2",
                }}>{stat.value}</div>
                <div style={{ color: "var(--muted)", fontSize: "13px" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <button
              onClick={() => setActiveTab("table")}
              style={{
                padding: "8px 18px", borderRadius: "10px", border: "1px solid",
                borderColor: activeTab === "table" ? "rgba(124,58,237,0.5)" : "var(--border)",
                background: activeTab === "table" ? "rgba(124,58,237,0.12)" : "var(--surface)",
                color: activeTab === "table" ? "#a855f7" : "var(--muted)",
                fontSize: "13px", fontWeight: "600", cursor: "pointer",
              }}
            >📋 {config.tableTitle}</button>
            <button
              onClick={() => setActiveTab("kanban")}
              style={{
                padding: "8px 18px", borderRadius: "10px", border: "1px solid",
                borderColor: activeTab === "kanban" ? "rgba(124,58,237,0.5)" : "var(--border)",
                background: activeTab === "kanban" ? "rgba(124,58,237,0.12)" : "var(--surface)",
                color: activeTab === "kanban" ? "#a855f7" : "var(--muted)",
                fontSize: "13px", fontWeight: "600", cursor: "pointer",
              }}
            >📊 CRM-воронка</button>
          </div>

          {/* TABLE */}
          {activeTab === "table" && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {config.tableHeaders.map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "var(--muted)", fontWeight: "600", fontSize: "12px", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < config.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "34px", height: "34px", borderRadius: "50%",
                            background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(99,102,241,0.2))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "13px", fontWeight: "700", color: "#a855f7", flexShrink: 0,
                          }}>{row.avatar}</div>
                          <span style={{ color: "var(--text)", fontWeight: "500" }}>{row.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: "13px" }}>{row.detail}</td>
                      <td style={{ padding: "12px 16px", color: "var(--muted)" }}>{row.time}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          background: `${row.statusColor}18`,
                          color: row.statusColor,
                          border: `1px solid ${row.statusColor}40`,
                          borderRadius: "100px",
                          padding: "3px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}>{row.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button style={{
                          background: "none", border: "1px solid var(--border)", borderRadius: "8px",
                          color: "var(--muted)", fontSize: "12px", padding: "4px 10px", cursor: "pointer",
                        }}>···</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* KANBAN */}
          {activeTab === "kanban" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" }}>
              {config.kanban.map((col) => (
                <div key={col.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
                  <div style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: col.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: "700", fontSize: "13px" }}>{col.title}</span>
                    <span style={{
                      marginLeft: "auto",
                      background: "var(--border)",
                      borderRadius: "100px",
                      padding: "1px 7px",
                      fontSize: "11px",
                      color: "var(--muted)",
                    }}>{col.items.length}</span>
                  </div>
                  <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {col.items.map((item, j) => (
                      <div key={j} style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        fontSize: "13px",
                        color: "var(--text)",
                        cursor: "pointer",
                      }}>{item}</div>
                    ))}
                    <button style={{
                      background: "none", border: "1px dashed var(--border)", borderRadius: "10px",
                      padding: "8px", color: "var(--muted)", fontSize: "13px", cursor: "pointer",
                      width: "100%",
                    }}>+ Добавить</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DEMO BANNER */}
          <div style={{
            marginTop: "24px",
            background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05))",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "6px" }}>
                Это демо-платформа для ниши «{config.name}»
              </div>
              <div style={{ color: "var(--muted)", fontSize: "14px" }}>
                Данные ненастоящие — показываем как выглядит реальная платформа. Запроси демо — настроим под твой бизнес за 2 недели.
              </div>
            </div>
            <Link href="/demo" className="btn-primary" style={{ padding: "12px 24px", fontSize: "14px", whiteSpace: "nowrap" }}>
              Хочу такую платформу →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
