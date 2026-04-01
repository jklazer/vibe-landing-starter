import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed sample leads
  await prisma.lead.createMany({
    data: [
      { name: "Alice Johnson", contact: "alice@example.com", consent: true },
      { name: "Bob Smith", contact: "+7 999 123 4567", consent: true },
    ],
    skipDuplicates: true,
  });

  // Seed sample events
  await prisma.conversionEvent.createMany({
    data: [
      { type: "landing_view", payload: { source: "seed" } },
      { type: "cta_click", payload: { section: "hero", source: "seed" } },
      { type: "lead_created", payload: { leadName: "Alice Johnson", source: "seed" } },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
