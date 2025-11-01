const axios = require('axios');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🌐 Checking: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 10000
    });
    
    const html = response.data.toLowerCase();
    
    console.log('📊 Basic analysis:');
    console.log('- Status code:', response.status);
    console.log('- HTML length:', html.length);
    
    // SIMPLE TEXT-BASED DETECTION (paling reliable)
    if (html.includes('offline')) {
      console.log('✅ STATUS: OFFLINE (text found in HTML)');
      return 'offline';
    }
    
    if (html.includes('online')) {
      console.log('✅ STATUS: ONLINE (text found in HTML)');
      return 'online';
    }
    
    // Jika tidak ketemu, kita butuh cara lain
    console.log('❓ Status tidak jelas dari HTML');
    
    // FALLBACK: Cek berdasarkan konten halaman
    const hasStoreContent = html.includes('nirqua') || html.includes('store');
    const hasProducts = html.includes('offer') || html.includes('item');
    
    console.log(`📦 Store indicators - Content: ${hasStoreContent}, Products: ${hasProducts}`);
    
    if (hasStoreContent && hasProducts) {
      console.log('✅ FALLBACK: ONLINE (store content + products found)');
      return 'online';
    } else if (hasStoreContent && !hasProducts) {
      console.log('✅ FALLBACK: OFFLINE (store content but no products)');
      return 'offline';
    } else {
      console.log('❌ FALLBACK: Tidak bisa menentukan');
      return null;
    }
    
  } catch (err) {
    console.error('❌ Connection error - OFFLINE');
    return 'offline';
  }
}

module.exports = { getStoreStatus };
