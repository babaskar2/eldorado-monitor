// apiService.js - PUPPETEER
const puppeteer = require('puppeteer');

async function getStoreStatus() {
  let browser;
  try {
    console.log('🚀 Launching real browser...');
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=site-per-process'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set realistic browser identity
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('🔍 Going to store page...');
    await page.goto('https://www.eldorado.gg/users/NirQua___Store?tab=Offers&category=CustomItem', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Tunggu untuk memastikan page fully loaded
    await page.waitForTimeout(8000);
    
    console.log('📄 Extracting page content...');
    
    // Screenshot untuk debug (opsional)
    // await page.screenshot({ path: 'debug.png' });
    
    // Cari status dengan berbagai cara
    const status = await page.evaluate(() => {
      console.log('🔍 Searching for status in browser...');
      
      // Cara 1: Cari element status langsung
      const statusElement = document.querySelector('span.mode-text');
      if (statusElement) {
        const text = statusElement.textContent?.trim().toLowerCase();
        console.log('Found status element:', text);
        if (text === 'offline' || text === 'online') return text;
      }
      
      // Cara 2: Cari di seluruh body
      const bodyText = document.body.textContent?.toLowerCase();
      console.log('Body text contains offline:', bodyText?.includes('offline'));
      console.log('Body text contains online:', bodyText?.includes('online'));
      
      if (bodyText?.includes('offline')) return 'offline';
      if (bodyText?.includes('online')) return 'online';
      
      // Cara 3: Cari di HTML attributes
      const html = document.documentElement.outerHTML.toLowerCase();
      if (html.includes('offline')) return 'offline';
      if (html.includes('online')) return 'online';
      
      return null;
    });
    
    if (status) {
      console.log(`✅ STATUS FOUND: ${status.toUpperCase()}`);
      return status;
    }
    
    console.log('❌ Status not detected');
    return null;
    
  } catch (err) {
    console.error('❌ Browser error:', err.message);
    return 'offline';
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { getStoreStatus };
