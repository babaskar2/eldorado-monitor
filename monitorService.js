const axios = require('axios');
const { sendDiscordMessage } = require('./discordService');
const { STORE_URL } = require('./config');

let lastStatus = null; // buat bandingin status lama & baru

async function monitor() {
  if (!STORE_URL) {
    console.error("❌ STORE_URL belum diatur di .env");
    return;
  }

  try {
    const { data: html } = await axios.get(STORE_URL);
    const isOnline = html.toLowerCase().includes("online");
    const status = isOnline ? "🟢 Online" : "🔴 Offline";

    if (status !== lastStatus) {
      await sendDiscordMessage(`📦 Store status berubah: ${status}`);
      lastStatus = status;
    } else {
      console.log(`ℹ️ Status belum berubah: ${status}`);
    }
  } catch (err) {
    console.error("❌ Gagal cek store:", err.message);
  }
}

module.exports = { monitor };
