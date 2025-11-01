const cron = require('node-cron');
const { monitor } = require('./monitorService');

console.log("🚀 Eldorado Store Monitor is running...");

// Jalankan langsung pertama kali
monitor();

// Jalankan tiap 10 menit
cron.schedule('*/10 * * * *', monitor);
