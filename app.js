const monitorService = require('./monitorService');
const authService = require('./authService');

class StoreMonitorApp {
    async start() {
        try {
            console.log('🚀 Starting Eldorado.gg Store Monitor...');
            console.log('📧 Email:', process.env.ELDORADO_EMAIL ? '***' : 'MISSING');
            console.log('⏰ Polling Interval:', process.env.POLLING_INTERVAL || 5, 'minutes');
            
            await authService.authenticate();
            
            monitorService.startMonitoring();
            
            setInterval(() => {
                console.log('💓 Monitor is running...');
            }, 60000);
            
            console.log('🎯 Store monitor is now active!');
            
        } catch (error) {
            console.error('❌ Failed to start:', error.message);
            process.exit(1);
        }
    }
}

const app = new StoreMonitorApp();
app.start();
