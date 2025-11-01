// config.js - FIXED for Railway
const config = {
    _pool_id: 'us-east-2_MlnzCFgHk',
    _client_id: '1956req5ro9drdtbf5i6kis4la',
    _cognito_hostname: 'https://login.eldorado.gg',
    _eldorado_hostname: 'eldorado.gg',
    
    // Railway might use different env var names, try both
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || process.env.RAILWAY_DISCORD_WEBHOOK_URL,
    email: process.env.ELDORADO_EMAIL || process.env.RAILWAY_ELDORADO_EMAIL,
    password: process.env.ELDORADO_PASSWORD || process.env.RAILWAY_ELDORADO_PASSWORD,
    pollingInterval: 5
};

console.log('🔍 Checking ALL environment variables:');
console.log('All env vars:', process.env);

// Manual override for testing - REMOVE LATER
if (!config.email || !config.password) {
    console.log('⚠️ Using manual credentials for testing');
    // Jangan taruh real credentials di sini!
}

module.exports = config;
