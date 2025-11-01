const { getMyOrders } = require('./apiService');
const { sendDiscordMessage } = require('./discordService');
require('dotenv').config();

async function monitor() {
  const { ELDORADO_API_KEY } = process.env;

  if (!ELDORADO_API_KEY) {
    return console.error("❌ API Key Eldorado tidak ditemukan di .env");
  }

  const orders = await getMyOrders(ELDORADO_API_KEY);
  if (!orders || orders.length === 0) return console.log("Tidak ada order.");

  const latest = orders[0];
  await sendDiscordMessage(`📦 Order terbaru: ${latest.id} - Status: ${latest.status}`);
}

module.exports = { monitor };
