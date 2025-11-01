const axios = require('axios');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Checking store: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    
    const html = response.data;
    
    // Convert ke lowercase untuk pencarian yang lebih mudah
    const htmlLower = html.toLowerCase();
    
    console.log('📊 Analisis halaman:');
    console.log('- Panjang HTML:', html.length);
    console.log('- Status code:', response.status);
    
    // Cari berbagai pattern yang mungkin menunjukkan status
    const patterns = {
      online: [
        'online',
        'aktif',
        'available',
        'ready',
        'live',
        'dijual',
        'sell',
        'buy'
      ],
      offline: [
        'offline',
        'tidak aktif',
        'unavailable',
        'sold out',
        'habis',
        'kosong'
      ]
    };
    
    // Hitung kemunculan kata-kata
    let onlineScore = 0;
    let offlineScore = 0;
    
    patterns.online.forEach(word => {
      const count = (htmlLower.match(new RegExp(word, 'g')) || []).length;
      if (count > 0) {
        console.log(`- "${word}": ${count} kali`);
        onlineScore += count;
      }
    });
    
    patterns.offline.forEach(word => {
      const count = (htmlLower.match(new RegExp(word, 'g')) || []).length;
      if (count > 0) {
        console.log(`- "${word}": ${count} kali`);
        offlineScore += count;
      }
    });
    
    console.log(`📈 Score - Online: ${onlineScore}, Offline: ${offlineScore}`);
    
    // Decision logic
    if (onlineScore > offlineScore) {
      console.log('✅ Decision: ONLINE (lebih banyak indikator online)');
      return 'online';
    } else if (offlineScore > onlineScore) {
      console.log('✅ Decision: OFFLINE (lebih banyak indikator offline)');
      return 'offline';
    } else {
      // Jika sama, cek apakah halaman berisi konten toko
      const hasStoreContent = htmlLower.includes('nirqua') || 
                             htmlLower.includes('store') || 
                             htmlLower.includes('eldorado');
      
      if (hasStoreContent && response.status === 200) {
        console.log('✅ Decision: ONLINE (halaman toko terload dengan baik)');
        return 'online';
      } else {
        console.log('❌ Decision: Tidak bisa menentukan status');
        return null;
      }
    }
    
  } catch (err) {
    console.error('❌ Error scraping:', err.message);
    
    // Berdasarkan error type, tentukan status
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      console.log('🌐 Connection failed - OFFLINE');
      return 'offline';
    } else if (err.response?.status === 404) {
      console.log('🔍 Page not found - OFFLINE');
      return 'offline';
    } else {
      console.log('❌ Unknown error - return null');
      return null;
    }
  }
}

module.exports = { getStoreStatus };
