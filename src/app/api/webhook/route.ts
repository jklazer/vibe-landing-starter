import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  try {
    // Verify secret (timing-safe comparison)
    const secret = req.headers.get("x-webhook-secret");
    const expected = process.env.WEBHOOK_SECRET;
    if (!secret || !expected || !timingSafeEqual(secret, expected)) {
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

    // Idempotency: try to create, catch unique constraint violation
    try {
      const event = await prisma.webhookEvent.create({
        data: {
          externalId: String(externalId),
          eventType: String(eventType).slice(0, 255),
          payload: payload ?? {},
        },
      });
      return NextResponse.json({ status: "processed", id: event.id }, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        const existing = await prisma.webhookEvent.findUnique({
          where: { externalId: String(externalId) },
        });
        return NextResponse.json(
          { status: "already_processed", id: existing?.id },
          { status: 200 },
        );
      }
      throw e;
    }
  } catch (err) {
    console.error("[webhook] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
