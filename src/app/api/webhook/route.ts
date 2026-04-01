import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Verify secret
    const secret = req.headers.get("x-webhook-secret");
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id: externalId, event_type: eventType, payload } = body;

    if (!externalId || !eventType) {
      return NextResponse.json(
        { error: "id and event_type are required" },
        { status: 400 },
      );
    }

    // Idempotency: check if already processed
    const existing = await prisma.webhookEvent.findUnique({
      where: { externalId: String(externalId) },
    });

    if (existing) {
      return NextResponse.json(
        { status: "already_processed", id: existing.id },
        { status: 200 },
      );
    }

    const event = await prisma.webhookEvent.create({
      data: {
        externalId: String(externalId),
        eventType,
        payload: payload ?? {},
      },
    });

    return NextResponse.json({ status: "processed", id: event.id }, { status: 201 });
  } catch (err) {
    console.error("[webhook] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
