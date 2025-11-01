const axios = require('axios');
const cheerio = require('cheerio');

async function getStoreStatus() {
  try {
    const storeUrl = 'https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem';
    
    console.log(`🔍 Deep scraping: ${storeUrl}`);
    
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      },
      timeout: 15000
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('=== DEEP SCRAPING ANALYSIS ===');
    
    // 1. Cari SEMUA element dengan class mengandung "mode"
    const modeElements = $('[class*="mode"]');
    console.log(`🔍 Elements with "mode" in class: ${modeElements.length}`);
    
    modeElements.each((i, el) => {
      const element = $(el);
      console.log(`   [${i}] Class: "${element.attr('class')}", Text: "${element.text().trim()}"`);
    });
    
    // 2. Cari SEMUA element dengan class mengandung "status"
    const statusElements = $('[class*="status"]');
    console.log(`🔍 Elements with "status" in class: ${statusElements.length}`);
    
    statusElements.each((i, el) => {
      const element = $(el);
      console.log(`   [${i}] Class: "${element.attr('class')}", Text: "${element.text().trim()}"`);
    });
    
    // 3. Cari SEMUA span elements dan filter yang relevan
    const allSpans = $('span');
    console.log(`🔍 Total span elements: ${allSpans.length}`);
    
    let relevantSpans = [];
    allSpans.each((i, el) => {
      const element = $(el);
      const text = element.text().trim();
      const classes = element.attr('class') || '';
      
      // Filter span yang mungkin berisi status
      if (text.toLowerCase() === 'online' || 
          text.toLowerCase() === 'offline' ||
          classes.includes('mode') ||
          classes.includes('status')) {
        relevantSpans.push({
          text: text,
          class: classes,
          html: element.toString().substring(0, 100)
        });
      }
    });
    
    console.log(`🔍 Relevant spans found: ${relevantSpans.length}`);
    relevantSpans.forEach((span, i) => {
      console.log(`   [${i}] Text: "${span.text}", Class: "${span.class}"`);
    });
    
    // 4. Cari di semua attribute data-* (mungkin status disimpan di data attribute)
    const dataElements = $('[data-*]');
    console.log(`🔍 Elements with data attributes: ${dataElements.length}`);
    
    // 5. Decision berdasarkan findings
    for (const span of relevantSpans) {
      if (span.text.toLowerCase() === 'offline') {
        console.log('✅ STATUS: OFFLINE (dari span text)');
        return 'offline';
      }
      if (span.text.toLowerCase() === 'online') {
        console.log('✅ STATUS: ONLINE (dari span text)');
        return 'online';
      }
    }
    
    console.log('❌ Tidak ditemukan status yang jelas');
    return null;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  }
}

module.exports = { getStoreStatus };
