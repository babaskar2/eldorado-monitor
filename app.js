const cron = require('node-cron');
const { monitor } = require('./monitorService');

monitor(); // langsung cek saat start
cron.schedule('*/10 * * * *', monitor); // tiap 10 menit
