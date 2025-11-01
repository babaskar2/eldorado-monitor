const https = require('https');
const authService = require('./authService');
const config = require('./config');

class ApiService {
    async makeAuthenticatedRequest(path) {
        const token = await authService.getToken();
        
        return new Promise((resolve, reject) => {
            const options = {
                hostname: config._eldorado_hostname,
                path: path,
                method: 'GET',
                headers: {
                    'Cookie': `__Host-EldoradoIdToken=${token}`,
                    'Accept': 'application/json',
                    'User-Agent': 'Store-Monitor-Bot/1.0'
                }
            };

            const req = https.get(options, (res) => {
                let body = '';
                
                res.on('data', (chunk) => {
                    body += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            resolve(JSON.parse(body));
                        } catch (e) {
                            reject(new Error('Failed to parse response'));
                        }
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                    }
                });
            });
            
            req.on('error', (e) => {
                reject(e);
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    async getStoreStatus() {
        try {
            const orders = await this.makeAuthenticatedRequest('/api/orders/me');
            return { online: true, lastChecked: new Date().toISOString() };
        } catch (error) {
            return { online: false, lastChecked: new Date().toISOString(), error: error.message };
        }
    }
}

module.exports = new ApiService();
