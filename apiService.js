const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    // URL toko Eldorado kamu
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Mencoba scraping: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
      timeout: 10000
    });
    
    const html = response.data;
    const $ = cheerio.load(html);

    console.log('📄 Panjang HTML:', html.length);
    
    // Coba cari indikator status toko
    // 1. Cari di header/profile toko
    const profileSelectors = [
      '.user-status',
      '.seller-status',
      '.status-indicator',
      '[class*="status"]',
      '.mode-identifier',
      '.online-status',
      '.offline-status'
    ];

    // 2. Cari di tab Offers
    const offerSelectors = [
      '.offer-status',
      '.item-status',
      '[class*="available"]',
      '[class*="stock"]'
    ];

    // 3. Cari teks yang mengandung online/offline
    const pageText = html.toLowerCase();
    console.log('🔍 Mencari teks "online/offline" dalam halaman...');

    if (pageText.includes('online')) {
      console.log('✅ Ditemukan teks "online"');
      return 'online';
    } else if (pageText.includes('offline')) {
      console.log('✅ Ditemukan teks "offline"');
      return 'offline';
    }

    // 4. Cari berdasarkan class yang umum dipakai
    for (const selector of [...profileSelectors, ...offerSelectors]) {
      const element = $(selector);
      if (element.length > 0) {
        const classes = element.attr('class') || '';
        const text = element.text().toLowerCase();
        
        console.log(`🔍 Found "${selector}":`, {
          classes: classes,
          text: text.substring(0, 100)
        });

        if (classes.includes('online') || text.includes('online')) {
          return 'online';
        } else if (classes.includes('offline') || text.includes('offline')) {
          return 'offline';
        }
      }
    }

    // 5. Cek apakah ada produk/offers yang aktif
    const offersCount = $('.offer, .item, .product, [class*="card"]').length;
    console.log(`📦 Jumlah offers ditemukan: ${offersCount}`);

    if (offersCount > 0) {
      console.log('✅ Toko memiliki offers - diasumsikan online');
      return 'online';
    }

    console.log('❌ Tidak bisa deteksi status toko dengan pasti');
    return null;

  } catch (err) {
    console.error('❌ Gagal ambil status toko:', err.message);
    
    // Jika error karena timeout atau connection, asumsikan offline
    if (err.code === 'ECONNABORTED' || err.response?.status >= 500) {
      console.log('🌐 Connection issue - asumsikan offline');
      return 'offline';
    }
    
    return null;
  }
}

module.exports = { getStoreStatus };
