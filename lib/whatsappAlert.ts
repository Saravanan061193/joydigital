export async function sendWhatsAppLeadAlert(newEnquiry: {
  name: string;
  mobile: string;
  email: string;
  service: string;
  companyName: string;
  budget: string;
  message: string;
  region: string;
  createdAt: string;
}) {
  const targetNumber = process.env.WHATSAPP_ALERT_NUMBER || "919080026133";
  const cleanedMobile = (newEnquiry.mobile || "").replace(/\D/g, "");

  const alertText = `🚨 *NEW JOY DIGITAL LEAD ALERT!*
--------------------------------
👤 *Name:* ${newEnquiry.name}
📱 *Mobile:* ${newEnquiry.mobile}
📧 *Email:* ${newEnquiry.email}
💼 *Service:* ${newEnquiry.service}
🏢 *Company:* ${newEnquiry.companyName}
💰 *Budget:* ${newEnquiry.budget}
🌍 *Region:* ${newEnquiry.region}
📝 *Details:* ${newEnquiry.message || "N/A"}

💬 *Direct WhatsApp Chat:*
https://wa.me/${cleanedMobile}?text=Hi%20${encodeURIComponent(newEnquiry.name)},%20thank%20you%20for%20contacting%20Joy%20Digital.`;

  // 1. If CallMeBot API Key is provided
  const callmebotApiKey = process.env.CALLMEBOT_API_KEY;
  if (callmebotApiKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=+${targetNumber}&text=${encodeURIComponent(
        alertText
      )}&apikey=${callmebotApiKey}`;
      await fetch(url, { method: "GET" });
    } catch (err) {
      console.error("CallMeBot WhatsApp alert error:", err);
    }
  }

  // 2. If a WhatsApp Webhook / UltraMsg / GreenAPI endpoint is configured
  const whatsappWebhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (whatsappWebhookUrl) {
    try {
      await fetch(whatsappWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: targetNumber,
          message: alertText,
          data: newEnquiry,
        }),
      });
    } catch (err) {
      console.error("WhatsApp Webhook alert error:", err);
    }
  }
}
