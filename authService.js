const { Amplify } = require('aws-amplify');
const { Auth } = require('aws-amplify/auth');

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_MlnzCFgHk',
      userPoolClientId: '1956req5ro9drdtbf5i6kis4la',
      loginWith: {
        oauth: {
          domain: 'https://login.eldorado.gg',
          redirectSignIn: 'https://eldorado.gg/account/auth-callback',
          responseType: "code",
        },
      },
    },
  },
};

class AuthService {
    constructor() {
        Amplify.configure(awsConfig);
        this.token = null;
    }

    async authenticate() {
        try {
            console.log('🔐 Attempting authentication with Amplify v6...');
            
            const email = process.env.ELDORADO_EMAIL;
            const password = process.env.ELDORADO_PASSWORD;
            
            if (!email || !password) {
                throw new Error('Missing credentials in environment variables');
            }

            console.log('Using email:', email.replace(/(?<=.).(?=.*@)/g, '*'));
            
            // PAKAI CARA RESMI DARI DOCS
            await Auth.signIn({ username: email, password: password });
            const session = await Auth.fetchAuthSession();
            this.token = session.tokens.idToken.toString();
            
            console.log('✅ Authentication successful!');
            return this.token;
            
        } catch (error) {
            console.error('❌ Authentication failed:', error.message);
            throw error;
        }
    }

    async getToken() {
        if (!this.token) {
            await this.authenticate();
        }
        return this.token;
    }
}

module.exports = new AuthService();
