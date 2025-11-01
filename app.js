const cron = require('node-cron');
const { monitor } = require('./monitorService');
const { CHECK_INTERVAL_MINUTES } = require('./config');

console.log("🚀 Eldorado Store Monitor is running...");

// Jalankan langsung
monitor();

// Jalankan tiap X menit
cron.schedule(`*/${CHECK_INTERVAL_MINUTES} * * * *`, monitor);
