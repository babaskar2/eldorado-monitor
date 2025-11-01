const { Amplify, Auth } = require('aws-amplify');

const awsConfig = {
  aws_cognito_region: "us-east-2",
  aws_user_pools_id: "us-east-2_MlnzCFgHk",
  aws_user_pools_web_client_id: "1956req5ro9drdtbf5i6kis4la",
  oauth: {
    domain: "login.eldorado.gg",
    redirectSignIn: "https://eldorado.gg/account/auth-callback",
    responseType: 'code'
  }
};

Amplify.configure(awsConfig);

async function getIdToken(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return user.signInUserSession.idToken.jwtToken;
  } catch (err) {
    console.error("❌ Error signing in:", err.message);
    return null;
  }
}

module.exports = { getIdToken };
