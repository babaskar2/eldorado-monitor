// apiService.js - AVAILABILITY CHECK
const axios = require('axios');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🌐 Checking store availability: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.eldorado.gg/',
        'Cache-Control': 'no-cache'
      },
      timeout: 10000,
      validateStatus: null // Terima semua status code
    });
    
    console.log(`📊 Response: ${response.status}, Length: ${response.data.length}`);
    
    // ANALISIS BERDASARKAN RESPONSE
    if (response.status === 404) {
      console.log('✅ STORE: OFFLINE (404 - Not Found)');
      return 'offline';
    }
    
    if (response.status === 403) {
      console.log('✅ STORE: OFFLINE (403 - Blocked/Access Denied)');
      return 'offline';
    }
    
    if (response.status === 200) {
      const html = response.data.toLowerCase();
      
      // Cek berbagai indikator
      const isErrorPage = html.includes('error') || html.includes('not found') || html.includes('unavailable');
      const isStorePage = html.includes('offer') || html.includes('item') || html.includes('product');
      const hasContent = response.data.length > 10000;
      
      console.log(`📈 Indicators - Error: ${isErrorPage}, Store: ${isStorePage}, Content: ${hasContent}`);
      
      if (isErrorPage || !hasContent) {
        console.log('✅ STORE: OFFLINE (Error page or no content)');
        return 'offline';
      }
      
      if (isStorePage && hasContent) {
        console.log('✅ STORE: ONLINE (Store page with content)');
        return 'online';
      }
    }
    
    // Default fallback
    console.log('❓ Uncertain status, defaulting to OFFLINE');
    return 'offline';
    
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    
    // Analisis error type
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      console.log('✅ STORE: OFFLINE (Connection failed)');
    } else if (err.response?.status === 404) {
      console.log('✅ STORE: OFFLINE (404 from error)');
    } else {
      console.log('✅ STORE: OFFLINE (Generic error)');
    }
    
    return 'offline';
  }
}

module.exports = { getStoreStatus };
