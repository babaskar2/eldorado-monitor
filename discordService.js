const axios = require('axios');
const config = require('./config');

class DiscordService {
    async sendWebhook(message) {
        try {
            const payload = {
                content: null,
                embeds: [{
                    title: message.title || 'Store Status Update',
                    description: message.description,
                    color: message.color || 0x00ff00,
                    timestamp: new Date().toISOString(),
                    fields: message.fields || [],
                    footer: {
                        text: 'Eldorado.gg Store Monitor'
                    }
                }]
            };

            await axios.post(config.discordWebhookUrl, payload);
            console.log('✅ Discord webhook sent successfully');
        } catch (error) {
            console.error('❌ Failed to send Discord webhook:', error.message);
        }
    }

    sendOnlineNotification() {
        return this.sendWebhook({
            title: '🟢 Store Online',
            description: 'Your Eldorado.gg store is now online and accessible.',
            color: 0x00ff00,
            fields: [
                {
                    name: 'Status',
                    value: 'Online',
                    inline: true
                },
                {
                    name: 'Time',
                    value: new Date().toLocaleString(),
                    inline: true
                }
            ]
        });
    }

    sendOfflineNotification(errorMessage) {
        return this.sendWebhook({
            title: '🔴 Store Offline',
            description: 'Your Eldorado.gg store appears to be offline or experiencing issues.',
            color: 0xff0000,
            fields: [
                {
                    name: 'Status',
                    value: 'Offline',
                    inline: true
                },
                {
                    name: 'Error',
                    value: errorMessage.substring(0, 1024),
                    inline: false
                },
                {
                    name: 'Time',
                    value: new Date().toLocaleString(),
                    inline: true
                }
            ]
        });
    }
}

module.exports = new DiscordService();
