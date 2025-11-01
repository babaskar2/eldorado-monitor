const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    const { data } = await axios.get('https://www.eldorado.gg/store'); // ganti URL toko
    const $ = cheerio.load(data);

    const statusClass = $('.mode-identifier').attr('class'); 
    if (!statusClass) return null;

    if (statusClass.includes('online')) return 'online';
    if (statusClass.includes('offline')) return 'offline';
    return null;
  } catch (err) {
    console.error('❌ Gagal ambil status toko:', err.message);
    return null;
  }
}

module.exports = { getStoreStatus };
