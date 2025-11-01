const { getStoreStatus } = require('./apiService');
const { sendDiscordMessage } = require('./discordService');
require('dotenv').config();

let lastStatus = null; // simpan status terakhir di memory

async function monitor() {
  try {
    const currentStatus = await getStoreStatus();

    if (lastStatus === null) {
      // Pertama kali jalan, cuma simpan aja tanpa kirim notif
      lastStatus = currentStatus;
      console.log(`🔍 Status awal: ${currentStatus}`);
      return;
    }

    if (currentStatus !== lastStatus) {
      // Status berubah => kirim notif ke Discord
      const emoji = currentStatus === 'Online' ? '🟢' : '🔴';
      await sendDiscordMessage(`📦 Store status berubah: ${emoji} ${currentStatus}`);
      console.log(`✅ Status berubah dari ${lastStatus} ke ${currentStatus}`);
      lastStatus = currentStatus; // update status terakhir
    } else {
      console.log(`⏳ Tidak ada perubahan status (${currentStatus})`);
    }
  } catch (err) {
    console.error("❌ Error saat monitor:", err.message);
  }
}

module.exports = { monitor };
