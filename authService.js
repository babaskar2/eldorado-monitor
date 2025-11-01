async authenticate() {
    try {
        console.log('🔐 Attempting authentication...');
        
        // Manual credentials for testing - REMOVE LATER
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
