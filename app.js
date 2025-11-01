// Tambahkan ini di BARIS PALING ATAS app.js
require('./polyfill');

// Kode existing Anda jangan diubah
const cron = require('node-cron');
const monitorService = require('./monitorService');
const config = require('./config');

console.log('Eldorado Store Monitor started...');

// Schedule task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled check...');
  try {
    await monitorService.checkStoreStatus();
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
});

// Immediate first run
(async () => {
  try {
    await monitorService.checkStoreStatus();
  } catch (error) {
    console.error('Error in initial check:', error);
  }
})();
