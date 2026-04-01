import { NextRequest, NextResponse } from "next/server";
import { trackEvent, type EventType } from "@/lib/events";

const ALLOWED_TYPES: EventType[] = ["landing_view", "cta_click", "lead_created"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, payload } = body;

    if (!type || !ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `type must be one of: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 },
      );
    }

    const event = await trackEvent(type, payload);

    return NextResponse.json({ id: event.id }, { status: 201 });
  } catch (err) {
    console.error("[events] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
