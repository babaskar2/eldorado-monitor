const { getStoreStatus } = require('./apiService');
const { sendDiscordMessage } = require('./discordService');
require('dotenv').config();

let lastStatus = null;

async function monitor() {
  try {
    const status = await getStoreStatus();

    if (!status) return console.log("⚠️ Tidak bisa ambil status toko.");

    // Hanya kirim ke Discord kalau status berubah
    if (status !== lastStatus) {
      await sendDiscordMessage(`📦 Store status berubah: ${status === 'online' ? '🟢 Online' : '🔴 Offline'}`);
      console.log(`📢 Notif dikirim: ${status}`);
      lastStatus = status;
    } else {
      console.log(`⏳ Tidak ada perubahan. Status masih: ${status}`);
    }

  } catch (err) {
    console.error("❌ Error saat monitor:", err.message);
  }
}

module.exports = { monitor };
