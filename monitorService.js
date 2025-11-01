const { getStoreStatus } = require('./apiService');
const { sendDiscordMessage } = require('./discordService');

let lastStatus = null;

async function monitor() {
  try {
    const status = await getStoreStatus();
    if (!status) return;

    if (status !== lastStatus) {
      lastStatus = status;
      const emoji = status === 'online' ? '🟢' : '🔴';
      await sendDiscordMessage(`📦 Store status berubah: ${emoji} ${status.charAt(0).toUpperCase() + status.slice(1)}`);
      console.log(`🔍 Status berubah: ${status}`);
    }
  } catch (err) {
    console.error('❌ Error saat monitor:', err.message);
  }
}

module.exports = { monitor };
