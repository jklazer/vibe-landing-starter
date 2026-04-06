# Vibe Landing Starter

Готовый к продакшну лендинг с формой заявки, аналитикой конверсий, webhook-приёмником и Telegram-уведомлениями.

**Живое демо:** [vibe-landing-starter-gold.vercel.app](https://vibe-landing-starter-gold.vercel.app)

**Стек:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Docker

## Возможности

- **5 секций лендинга:** Hero / Доверие / Преимущества / FAQ / CTA
- **Форма заявки:** имя + контакт + согласие → сохранение в Postgres
- **События конверсии:** `landing_view`, `cta_click`, `lead_created` — отслеживание в БД
- **Webhook-приёмник:** защищённый эндпоинт с секретом + идемпотентность
- **Telegram-оповещения:** мгновенное уведомление о новых лидах
- **Docker Compose:** одна команда для запуска всего

## Быстрый старт (локально)

### Требования

- Node.js 18+
- PostgreSQL (или Docker)

### 1. Клонировать и установить

```bash
git clone https://github.com/jklazer/vibe-landing-starter.git
cd vibe-landing-starter
npm install
```

### 2. Настроить окружение

```bash
cp .env.example .env
# Отредактируйте .env — укажите DATABASE_URL, TG_BOT_TOKEN, TG_CHAT_ID, WEBHOOK_SECRET
```

### 3. Настроить базу данных

```bash
# Запустить Postgres (если через Docker)
docker compose up db -d

# Применить миграции
npx prisma migrate dev --name init

# (Опционально) Заполнить тестовыми данными
npm run db:seed
```

### 4. Запустить

```bash
npm run dev
# Откройте http://localhost:3000
```

## Docker Compose (продакшн)

```bash
cp .env.example .env
# Укажите продакшн-значения в .env

docker compose up -d --build
# Приложение доступно на http://localhost:3000
# Миграции применяются автоматически при старте контейнера
```

## Миграции базы данных

```bash
# Создать новую миграцию (разработка)
npx prisma migrate dev --name describe_change

# Применить миграции (продакшн)
npx prisma migrate deploy

# Визуальный браузер базы данных
npm run db:studio
```

## Демо-скрипт (проверка за 2 минуты)

```bash
# По умолчанию: http://localhost:3000
bash scripts/demo.sh

# Свой URL
bash scripts/demo.sh https://your-domain.com

# С кастомным секретом
WEBHOOK_SECRET=my-secret bash scripts/demo.sh
```

Скрипт проверяет:
1. Лендинг загружается (200)
2. Трекинг событий работает (201)
3. Создание лида работает (201) + отправляет TG-уведомление
4. Webhook обрабатывает событие (201)
5. Дублирующий webhook идемпотентен (200)
6. Неверный секрет отклоняется (401)

## API-эндпоинты

### `POST /api/leads`

Создать новый лид.

```json
{
  "name": "Иван Иванов",
  "contact": "ivan@example.com",
  "consent": true
}
```

### `POST /api/events`

Отслеживание события конверсии.

```json
{
  "type": "landing_view",
  "payload": { "source": "google" }
}
```

Типы: `landing_view`, `cta_click`

> Событие `lead_created` создаётся автоматически на сервере при создании лида.

### `POST /api/webhook`

Приём внешних событий. Требуется заголовок `x-webhook-secret`.

```json
{
  "id": "unique-event-id",
  "event_type": "payment.completed",
  "payload": { "amount": 99 }
}
```

Дублирующий `id` возвращает `200` вместо `201` (идемпотентность).

## Переменные окружения

| Переменная | Описание | Пример |
|------------|----------|--------|
| `DATABASE_URL` | Строка подключения PostgreSQL | `postgresql://postgres:postgres@localhost:5432/vibelanding` |
| `TG_BOT_TOKEN` | Токен Telegram Bot API | `123456:ABC-DEF...` |
| `TG_CHAT_ID` | ID чата/группы Telegram | `-1001234567890` |
| `WEBHOOK_SECRET` | Секрет для аутентификации вебхуков | `my-super-secret` |

## Лицензия

MIT
