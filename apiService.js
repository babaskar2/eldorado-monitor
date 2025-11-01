const axios = require('axios');

async function getMyOrders(idToken) {
  const res = await axios.get('https://eldorado.gg/api/orders/me', {
    headers: {
      Cookie: `__Host-EldoradoIdToken=${idToken}`
    }
  });
  return res.data;
}

module.exports = { getMyOrders };
