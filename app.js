// Tambahkan ini di BARIS PALING ATAS app.js
require('./polyfill');

// Kode existing Anda jangan diubah
const cron = require('node-cron');
const { monitor } = require('./monitorService'); // <- PERHATIKAN: pakai { monitor }
const config = require('./config');

console.log('Eldorado Store Monitor started...');

// Schedule task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled check...');
  try {
    await monitor(); // <- UBAH: checkStoreStatus() menjadi monitor()
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
});

// Immediate first run
(async () => {
  try {
    await monitor(); // <- UBAH: checkStoreStatus() menjadi monitor()
  } catch (error) {
    console.error('Error in initial check:', error);
  }
})();
