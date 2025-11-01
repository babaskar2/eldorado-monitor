const { getIdToken } = require('./authService');
const { getMyOrders } = require('./apiService');
const { sendDiscordMessage } = require('./discordService');
require('dotenv').config();

async function monitor() {
  const { ELDORADO_EMAIL, ELDORADO_PASSWORD } = process.env;
  const idToken = await getIdToken(ELDORADO_EMAIL, ELDORADO_PASSWORD);
  if (!idToken) return console.error("❌ Gagal login ke Eldorado");

  const orders = await getMyOrders(idToken);
  if (!orders || orders.length === 0) return console.log("Tidak ada order.");

  const latest = orders[0];
  await sendDiscordMessage(`📦 Order terbaru: ${latest.id} - Status: ${latest.status}`);
}

module.exports = { monitor };
