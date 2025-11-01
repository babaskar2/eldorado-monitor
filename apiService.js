// apiService.js - PUPPETEER CORE
const puppeteer = require('puppeteer-core');

async function getStoreStatus() {
  let browser;
  try {
    console.log('🚀 Launching lightweight browser...');
    
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium', // Pakai chromium yang sudah ada
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ]
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('🔍 Quick navigation...');
    await page.goto('https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem', {
      waitUntil: 'domcontentloaded', // Lebih cepat
      timeout: 15000
    });
    
    // Tunggu sebentar saja
    await page.waitForTimeout(3000);
    
    const status = await page.evaluate(() => {
      const element = document.querySelector('span.mode-text');
      return element ? element.textContent.trim().toLowerCase() : null;
    });
    
    if (status === 'offline' || status === 'online') {
      console.log(`✅ STATUS: ${status.toUpperCase()}`);
      return status;
    }
    
    console.log('❌ Status not found');
    return null;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getStoreStatus };
