// apiService.js - BACK TO AXIOS + SCRAPING SERVICE
const axios = require('axios');

async function getStoreStatus() {
  try {
    // Gunakan free scraping service
    const response = await axios.get('https://api.allorigins.win/raw', {
      params: {
        url: 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem'
      },
      timeout: 10000
    });
    
    const html = response.data.toLowerCase();
    console.log('📄 HTML length:', html.length);
    
    if (html.includes('offline')) {
      console.log('✅ STATUS: OFFLINE');
      return 'offline';
    }
    
    if (html.includes('online')) {
      console.log('✅ STATUS: ONLINE');
      return 'online';
    }
    
    console.log('❌ Status not found');
    return null;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  }
}

module.exports = { getStoreStatus };
