require('dotenv').config();

const config = {
    _pool_id: 'us-east-2_MlnzCFgHk',
    _client_id: '1956req5ro9drdtbf5i6kis4la',
    _cognito_hostname: 'https://login.eldorado.gg',
    _eldorado_hostname: 'eldorado.gg',
    
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
    email: process.env.ELDORADO_EMAIL,
    password: process.env.ELDORADO_PASSWORD,
    pollingInterval: parseInt(process.env.POLLING_INTERVAL) || 5
};

// Debug: Show what's actually set
console.log('🔍 DEBUG Environment Variables:');
console.log('- ELDORADO_EMAIL:', process.env.ELDORADO_EMAIL ? 'SET' : 'NOT SET');
console.log('- ELDORADO_PASSWORD:', process.env.ELDORADO_PASSWORD ? 'SET' : 'NOT SET');
console.log('- DISCORD_WEBHOOK_URL:', process.env.DISCORD_WEBHOOK_URL ? 'SET' : 'NOT SET');

// Continue anyway for testing
console.log('🚀 Continuing despite missing variables for testing...');

module.exports = config;
