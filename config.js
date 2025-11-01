require('dotenv').config();

module.exports = {
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  STORE_URL: process.env.STORE_URL,
  CHECK_INTERVAL_MINUTES: process.env.CHECK_INTERVAL_MINUTES || 5,
};
