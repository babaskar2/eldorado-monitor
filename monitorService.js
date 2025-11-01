const cron = require('node-cron');
const apiService = require('./apiService');
const discordService = require('./discordService');
const config = require('./config');

class MonitorService {
    constructor() {
        this.lastStatus = null;
        this.isMonitoring = false;
    }

    startMonitoring() {
        console.log('🚀 Starting store monitoring...');
        this.isMonitoring = true;
        
        this.checkStoreStatus();
        
        cron.schedule(`*/${config.pollingInterval} * * * *`, () => {
            if (this.isMonitoring) {
                this.checkStoreStatus();
            }
        });
        
        console.log(`✅ Store monitoring started. Checking every ${config.pollingInterval} minutes.`);
    }

    stopMonitoring() {
        this.isMonitoring = false;
        console.log('🛑 Store monitoring stopped.');
    }

    async checkStoreStatus() {
        try {
            console.log('🔍 Checking store status...');
            const status = await apiService.getStoreStatus();
            const currentStatus = status.online ? 'online' : 'offline';
            
            if (this.lastStatus === null) {
                console.log(`📊 Initial store status: ${currentStatus}`);
            } else if (this.lastStatus !== currentStatus) {
                console.log(`🔄 Store status changed from ${this.lastStatus} to ${currentStatus}`);
                await this.handleStatusChange(currentStatus, status);
            } else {
                console.log(`📊 Store status unchanged: ${currentStatus}`);
            }
            
            this.lastStatus = currentStatus;
            
        } catch (error) {
            console.error('❌ Error checking store status:', error.message);
            
            if (this.lastStatus === 'online') {
                await discordService.sendOfflineNotification(error.message);
                this.lastStatus = 'offline';
            }
        }
    }

    async handleStatusChange(newStatus, apiResponse) {
        if (newStatus === 'online') {
            await discordService.sendOnlineNotification();
        } else {
            const errorMessage = apiResponse?.error || 'Unknown error';
            await discordService.sendOfflineNotification(errorMessage);
        }
    }
}

module.exports = new MonitorService();
