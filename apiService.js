const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Checking: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // METHOD 1: Cari teks status langsung
    const statusText = $('span.mode-text').text().trim().toLowerCase();
    console.log(`📝 Status text: "${statusText}"`);
    
    if (statusText === 'offline') {
      console.log('✅ Status: OFFLINE');
      return 'offline';
    } else if (statusText === 'online') {
      console.log('✅ Status: ONLINE');
      return 'online';
    }
    
    // METHOD 2: Cari class di mode-identifier
    const modeClass = $('.mode-identifier').attr('class') || '';
    console.log(`🎨 Mode class: "${modeClass}"`);
    
    if (modeClass.includes('offline')) {
      console.log('✅ Status: OFFLINE (dari class)');
      return 'offline';
    } else if (modeClass.includes('online')) {
      console.log('✅ Status: ONLINE (dari class)');
      return 'online';
    }
    
    // METHOD 3: Fallback - cek apakah ada konten toko
    const hasContent = $('body').text().length > 1000;
    if (hasContent) {
      console.log('❓ Status tidak jelas, tapi halaman ada konten - asumsikan ONLINE');
      return 'online';
    } else {
      console.log('❓ Status tidak jelas, halaman kosong - asumsikan OFFLINE');
      return 'offline';
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  }
}

module.exports = { getStoreStatus };
