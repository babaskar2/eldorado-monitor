const cron = require('node-cron');
const { monitor } = require('./monitorService');
const { CHECK_INTERVAL_MINUTES } = require('./config');

console.log("🚀 Eldorado Store Monitor is running...");
monitor(); // jalan langsung pertama kali

cron.schedule(`*/${CHECK_INTERVAL_MINUTES} * * * *`, monitor);
