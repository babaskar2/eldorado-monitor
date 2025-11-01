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

if (!config.email || !config.password || !config.discordWebhookUrl) {
    console.error('❌ Missing required environment variables!');
    console.error('Please set: ELDORADO_EMAIL, ELDORADO_PASSWORD, DISCORD_WEBHOOK_URL');
    process.exit(1);
}

module.exports = config;
