const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    // Ganti URL_DTOKO_KAMU dengan URL toko Eldorado kamu
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    const response = await axios.get(storeUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    // Cari elemen yang menunjukkan status online/offline
    // Ini contoh - kamu perlu inspect element halaman toko kamu
    const statusElement = $('.mode-identifier, .status-indicator, [class*="online"], [class*="offline"]');
    
    if (statusElement.length > 0) {
      const classes = statusElement.attr('class') || '';
      if (classes.includes('online')) {
        return 'online';
      } else if (classes.includes('offline')) {
        return 'offline';
      }
    }

    // Alternatif: cari teks "Online" atau "Offline" di halaman
    const pageText = html.toLowerCase();
    if (pageText.includes('online') && !pageText.includes('offline')) {
      return 'online';
    } else if (pageText.includes('offline')) {
      return 'offline';
    }

    console.log('❌ Tidak bisa deteksi status toko');
    return null;

  } catch (err) {
    console.error('❌ Gagal ambil status toko:', err.message);
    return null;
  }
}

module.exports = { getStoreStatus };
