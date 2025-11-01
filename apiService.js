const axios = require('axios');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Smart status detection...`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const html = response.data;
    
    // CASE INSENSITIVE SEARCH (lebih aman)
    const htmlLower = html.toLowerCase();
    
    // Cari berbagai variasi teks offline
    const offlineIndicators = [
      'shop is offline',
      'store is offline', 
      'offline',
      'toko tutup',
      'toko offline'
    ];
    
    let isOffline = false;
    
    for (const indicator of offlineIndicators) {
      if (htmlLower.includes(indicator)) {
        console.log(`🔍 Found: "${indicator}"`);
        isOffline = true;
        break;
      }
    }
    
    console.log(`📊 Final decision: ${isOffline ? 'OFFLINE' : 'ONLINE'}`);
    
    return isOffline ? 'offline' : 'online';
    
  } catch (err) {
    console.error('❌ Error - default to OFFLINE');
    return 'offline';
  }
}

module.exports = { getStoreStatus };
