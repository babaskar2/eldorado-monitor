const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🌐 Browser-like request: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
      timeout: 15000
    });
    
    console.log(`📊 Response: ${response.status}`);
    console.log(`📄 HTML length: ${response.data.length}`);
    
    const $ = cheerio.load(response.data);
    
    // Simpan HTML untuk debug
    const html = response.data;
    const htmlLower = html.toLowerCase();
    
    console.log('=== DEBUG INFO ===');
    console.log('Contains "offline":', htmlLower.includes('offline'));
    console.log('Contains "online":', htmlLower.includes('online'));
    console.log('Contains "nirqua":', htmlLower.includes('nirqua'));
    
    // Cari di SEMUA tempat termasuk comments, attributes, dll
    if (htmlLower.includes('offline')) {
      // Cari konteks dimana "offline" muncul
      const offlineIndex = htmlLower.indexOf('offline');
      const context = html.substring(Math.max(0, offlineIndex - 50), offlineIndex + 50);
      console.log(`🎯 OFFLINE context: ...${context}...`);
      console.log('✅ STATUS: OFFLINE');
      return 'offline';
    }
    
    if (htmlLower.includes('online')) {
      const onlineIndex = htmlLower.indexOf('online');
      const context = html.substring(Math.max(0, onlineIndex - 50), onlineIndex + 50);
      console.log(`🎯 ONLINE context: ...${context}...`);
      console.log('✅ STATUS: ONLINE');
      return 'online';
    }
    
    // Jika masih tidak ketemu, mungkin butuh approach berbeda
    console.log('❌ Status text not found in raw HTML');
    console.log('🔍 First 1000 chars:', html.substring(0, 1000));
    
    return null;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.response) {
      console.log('Response status:', err.response.status);
      console.log('Response headers:', err.response.headers);
    }
    return 'offline';
  }
}

module.exports = { getStoreStatus };
