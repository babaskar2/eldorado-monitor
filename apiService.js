// apiService.js - REALISTIC SIMULATION
let lastManualStatus = 'offline'; // Default offline
let checkCount = 0;

async function getStoreStatus() {
  try {
    checkCount++;
    
    // Simulasi realistic: 90% tetap status sama, 10% berubah (seperti toko real)
    const shouldChange = Math.random() < 0.1; // 10% chance to change
    
    if (shouldChange) {
      lastManualStatus = lastManualStatus === 'online' ? 'offline' : 'online';
      console.log(`🔄 SIMULATION: Status changed to ${lastManualStatus.toUpperCase()}`);
    } else {
      console.log(`📊 SIMULATION: Status remains ${lastManualStatus.toUpperCase()} (check #${checkCount})`);
    }
    
    return lastManualStatus;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return 'offline';
  }
}

module.exports = { getStoreStatus };
