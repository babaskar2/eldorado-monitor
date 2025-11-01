// config.js - FIXED for Railway
const config = {
    _pool_id: 'us-east-2_MlnzCFgHk',
    _client_id: '1956req5ro9drdtbf5i6kis4la',
    _cognito_hostname: 'https://login.eldorado.gg',
    _eldorado_hostname: 'eldorado.gg',
    
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
    email: process.env.ELDORADO_EMAIL,
    password: process.env.ELDORADO_PASSWORD,
    pollingInterval: 5
};

console.log('🔍 Checking environment variables...');
console.log('ELDORADO_EMAIL:', process.env.ELDORADO_EMAIL ? 'SET' : 'NOT SET');

module.exports = config;
