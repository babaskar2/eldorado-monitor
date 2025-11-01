const axios = require('axios');

async function getStoreStatus() {
  try {
    // Ganti URL ini sesuai endpoint aslimu, ini contoh dummy biar gak error
    const res = await axios.get('https://www.eldorado.gg/api/store/status');
    const isOnline = res.data?.online === true;
    return isOnline ? 'online' : 'offline';
  } catch (err) {
    console.error("❌ Gagal ambil status toko:", err.message);
    return null;
  }
}

module.exports = { getStoreStatus };
