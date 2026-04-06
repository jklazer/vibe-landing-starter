# Vibe Landing Starter

Production-ready landing page with lead capture, conversion analytics, webhook inbox, and Telegram notifications.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Docker

## Features

- **5-section landing:** Hero / Proof / Benefits / FAQ / CTA
- **Lead form:** name + contact + consent → saved to Postgres
- **Conversion events:** `landing_view`, `cta_click`, `lead_created` tracked in DB
- **Webhook inbox:** secure endpoint with secret + idempotency
- **Telegram alerts:** instant notification on new leads
- **Docker Compose:** one command to run everything

## Quick Start (local)

### Prerequisites

- Node.js 18+
- PostgreSQL (or use Docker)

### 1. Clone & install

```bash
git clone https://github.com/jklazer/vibe-landing-starter.git
cd vibe-landing-starter
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — set DATABASE_URL, TG_BOT_TOKEN, TG_CHAT_ID, WEBHOOK_SECRET
```

### 3. Set up database

```bash
# Start Postgres (if using Docker)
docker compose up db -d

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed sample data
npm run db:seed
```

### 4. Run

```bash
npm run dev
# Open http://localhost:3000
```

## Docker Compose (production)

```bash
cp .env.example .env
# Edit .env with production values

docker compose up -d --build
# App available at http://localhost:3000

# Run migrations inside container
docker compose exec app npx prisma migrate deploy
```

## Database Migrations

```bash
# Create new migration (development)
npx prisma migrate dev --name describe_change

# Apply migrations (production)
npx prisma migrate deploy

# Visual database browser
npm run db:studio
```

## Demo Script (verify in 2 min)

```bash
# Default: http://localhost:3000
bash scripts/demo.sh

# Custom URL
bash scripts/demo.sh https://your-domain.com

# With custom webhook secret
WEBHOOK_SECRET=my-secret bash scripts/demo.sh
```

The script checks:
1. Landing page loads (200)
2. Event tracking works (201)
3. Lead creation works (201) + triggers TG notification
4. Webhook processes event (201)
5. Duplicate webhook is idempotent (200)
6. Wrong webhook secret is rejected (401)

## API Endpoints

### `POST /api/leads`

Create a new lead.

```json
{
  "name": "John Doe",
  "contact": "john@example.com",
  "consent": true
}
```

### `POST /api/events`

Track a conversion event.

```json
{
  "type": "landing_view",
  "payload": { "source": "google" }
}
```

Types: `landing_view`, `cta_click`, `lead_created`

### `POST /api/webhook`

Receive external events. Requires `x-webhook-secret` header.

```json
{
  "id": "unique-event-id",
  "event_type": "payment.completed",
  "payload": { "amount": 99 }
}
```

Duplicate `id` values return `200` instead of `201` (idempotency).

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/vibelanding` |
| `TG_BOT_TOKEN` | Telegram Bot API token | `123456:ABC-DEF...` |
| `TG_CHAT_ID` | Telegram chat/group ID | `-1001234567890` |
| `WEBHOOK_SECRET` | Secret for webhook authentication | `my-super-secret` |

## License

MIT
