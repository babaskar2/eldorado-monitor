const axios = require('axios');

async function sendDiscordMessage(message) {
  try {
    await axios.post(process.env.DISCORD_WEBHOOK, { content: message });
    console.log("✅ Discord message sent");
  } catch (err) {
    console.error("❌ Gagal kirim ke Discord:", err.message);
  }
}

module.exports = { sendDiscordMessage };
