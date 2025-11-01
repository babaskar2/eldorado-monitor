async function getStoreStatus() {
  // Simulasi status acak
  const random = Math.random() > 0.5 ? 'online' : 'offline';
  console.log(`🔍 Simulasi status toko: ${random}`);
  return random;
}

module.exports = { getStoreStatus };
