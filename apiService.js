const axios = require('axios');

async function getMyOrders() {
  const cookie = process.env.ELDORADO_COOKIE;

  const res = await axios.get('https://www.eldorado.gg/api/orders/me/seller/orders', {
    headers: {
      Cookie: cookie,
    },
  });

  return res.data;
}

module.exports = { getMyOrders };
