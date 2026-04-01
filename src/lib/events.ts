import { prisma } from "./prisma";

export type EventType = "landing_view" | "cta_click" | "lead_created";

export async function trackEvent(type: EventType, payload?: Record<string, unknown>) {
  return prisma.conversionEvent.create({
    data: { type, payload: payload ?? undefined },
  });
}
