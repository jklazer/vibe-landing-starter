#!/usr/bin/env bash
# Demo script — verifies the project in ~2 minutes
# Usage: bash scripts/demo.sh [BASE_URL]

BASE=${1:-http://localhost:3000}
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

pass() { echo -e "${GREEN}[PASS]${NC} $1"; }
fail() { echo -e "${RED}[FAIL]${NC} $1"; exit 1; }

echo "=== Vibe Landing Starter — Demo ==="
echo "Base URL: $BASE"
echo ""

# 1. Landing page loads
echo "1. Checking landing page..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE")
[ "$STATUS" = "200" ] && pass "Landing page returns 200" || fail "Landing page returned $STATUS"

# 2. Track event
echo "2. Tracking landing_view event..."
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/events" \
  -H "Content-Type: application/json" \
  -d '{"type":"landing_view","payload":{"source":"demo"}}')
CODE=$(echo "$RES" | tail -1)
[ "$CODE" = "201" ] && pass "Event tracked (201)" || fail "Event tracking returned $CODE"

# 3. Create lead
echo "3. Creating a lead..."
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/leads" \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","contact":"demo@test.com","consent":true}')
CODE=$(echo "$RES" | tail -1)
BODY=$(echo "$RES" | head -1)
[ "$CODE" = "201" ] && pass "Lead created (201): $BODY" || fail "Lead creation returned $CODE: $BODY"

# 4. Webhook — first delivery
echo "4. Sending webhook (first delivery)..."
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/webhook" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: ${WEBHOOK_SECRET:-your-webhook-secret-here}" \
  -d '{"id":"demo-evt-001","event_type":"payment.completed","payload":{"amount":99}}')
CODE=$(echo "$RES" | tail -1)
BODY=$(echo "$RES" | head -1)
[ "$CODE" = "201" ] && pass "Webhook processed (201): $BODY" || fail "Webhook returned $CODE: $BODY"

# 5. Webhook — duplicate (idempotency check)
echo "5. Sending duplicate webhook (idempotency)..."
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/webhook" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: ${WEBHOOK_SECRET:-your-webhook-secret-here}" \
  -d '{"id":"demo-evt-001","event_type":"payment.completed","payload":{"amount":99}}')
CODE=$(echo "$RES" | tail -1)
BODY=$(echo "$RES" | head -1)
[ "$CODE" = "200" ] && pass "Duplicate detected (200): $BODY" || fail "Idempotency check returned $CODE: $BODY"

# 6. Webhook — bad secret
echo "6. Sending webhook with wrong secret..."
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/webhook" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: wrong-secret" \
  -d '{"id":"demo-evt-002","event_type":"test","payload":{}}')
[ "$CODE" = "401" ] && pass "Unauthorized (401)" || fail "Expected 401, got $CODE"

echo ""
echo "=== All checks passed! ==="
