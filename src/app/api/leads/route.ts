import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/events";
import { sendTelegramMessage } from "@/lib/telegram";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, consent } = body;

    if (
      !name || typeof name !== "string" ||
      !contact || typeof contact !== "string" ||
      consent !== true
    ) {
      return NextResponse.json(
        { error: "name, contact (string) and consent (true) are required" },
        { status: 400 },
      );
    }

    const safeName = name.trim().slice(0, 200);
    const safeContact = contact.trim().slice(0, 200);

    const lead = await prisma.lead.create({
      data: { name: safeName, contact: safeContact, consent },
    });

    await trackEvent("lead_created", {
      leadId: lead.id,
      name: lead.name,
      contact: lead.contact,
    });

    // Telegram notification (fire-and-forget, HTML-escaped)
    sendTelegramMessage(
      `<b>New Lead!</b>\n\n` +
      `<b>Name:</b> ${escapeHtml(lead.name)}\n` +
      `<b>Contact:</b> ${escapeHtml(lead.contact)}\n` +
      `<b>ID:</b> <code>${lead.id}</code>\n` +
      `<b>Time:</b> ${lead.createdAt.toISOString()}`,
    ).catch((err) => console.error("[TG] notification failed:", err));

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
