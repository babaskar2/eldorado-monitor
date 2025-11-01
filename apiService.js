const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Checking: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 15000
    });
    
    const $ = cheerio.load(response.data);
    
    // HAPUS semua script dan style tags (biar gak baca JavaScript)
    $('script, style, noscript').remove();
    
    // Ambil SEMUA teks dari halaman
    const allText = $('body').text();
    
    // Bersihkan teks (hapus spasi berlebihan, newlines, dll)
    const cleanText = allText.replace(/\s+/g, ' ').toLowerCase();
    
    console.log('📄 Sample text dari halaman:', cleanText.substring(0, 500));
    
    // Cari kata kunci yang spesifik
    if (cleanText.includes('offline')) {
      console.log('✅ Ditemukan "offline" di halaman - OFFLINE');
      return 'offline';
    }
    
    if (cleanText.includes('online')) {
      console.log('✅ Ditemukan "online" di halaman - ONLINE');
      return 'online';
    }
    
    // Cari pattern lain
    const patterns = {
      offline: [
        'store is offline',
        'seller is offline', 
        'toko offline',
        'currently offline',
        'status: offline'
      ],
      online: [
        'store is online',
        'seller is online',
        'toko online',
        'currently online',
        'status: online'
      ]
    };
    
    for (const pattern of patterns.offline) {
      if (cleanText.includes(pattern)) {
        console.log(`✅ Ditemukan "${pattern}" - OFFLINE`);
        return 'offline';
      }
    }
    
    for (const pattern of patterns.online) {
      if (cleanText.includes(pattern)) {
        console.log(`✅ Ditemukan "${pattern}" - ONLINE`);
        return 'online';
      }
    }
    
    console.log('❌ Tidak ditemukan indikator status yang jelas');
    return null;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  }
}

module.exports = { getStoreStatus };
