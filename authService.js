const { Amplify, Auth } = require('aws-amplify');
const config = require('./config');

const awsConfig = {
    aws_cognito_region: "us-east-2",
    aws_user_pools_id: config._pool_id,
    aws_user_pools_web_client_id: config._client_id,
    oauth: {
        domain: config._cognito_hostname,
        redirectSignIn: `https://${config._eldorado_hostname}/account/auth-callback`,
        responseType: 'code'
    }
};

class AuthService {
    constructor() {
        Amplify.configure(awsConfig);
        this.token = null;
        this.tokenExpiry = null;
    }

    async authenticate() {
        try {
            console.log('🔐 Attempting authentication...');
            
            // Manual credentials for testing
            const testEmail = process.env.ELDORADO_EMAIL || 'test@example.com';
            const testPassword = process.env.ELDORADO_PASSWORD || 'testpassword';
            
            console.log('Using email:', testEmail ? '***' : 'MISSING');
            
            const user = await Auth.signIn(testEmail, testPassword);
            this.token = user.signInUserSession.idToken.jwtToken;
            this.tokenExpiry = new Date(user.signInUserSession.idToken.payload.exp * 1000);
            console.log('✅ Authentication successful');
            return this.token;
        } catch (error) {
            console.error('❌ Authentication failed:', error.message);
            throw error;
        }
    }

    async getToken() {
        if (!this.token || this.isTokenExpired()) {
            await this.authenticate();
        }
        return this.token;
    }

    isTokenExpired() {
        if (!this.tokenExpiry) return true;
        return new Date() > this.tokenExpiry;
    }
}

module.exports = new AuthService();
