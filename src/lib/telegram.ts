const TG_API = "https://api.telegram.org/bot";

export async function sendTelegramMessage(text: string) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[TG] TG_BOT_TOKEN or TG_CHAT_ID not set, skipping notification");
    return;
  }

  const res = await fetch(`${TG_API}${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[TG] Failed to send message:", res.status, body);
  }
}
