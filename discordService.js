const axios = require('axios');
const { DISCORD_WEBHOOK_URL } = require('./config');

async function sendDiscordMessage(content) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("❌ Webhook Discord belum diatur di .env");
    return;
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content });
    console.log("✅ Pesan dikirim ke Discord");
  } catch (error) {
    console.error("❌ Gagal kirim ke Discord:", error.message);
  }
}

module.exports = { sendDiscordMessage };
