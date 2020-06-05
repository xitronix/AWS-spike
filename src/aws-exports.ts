export const awsconfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-west-2:0e7761f7-7ff5-442b-88dc-556cd657f302',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_Eu9t4ZxIw',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '70imhr4b0i0hb8ajcr424t2jbs',

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    
    oauth: {
      domain: 'unilogin.auth.us-west-2.amazoncognito.com',
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:3000',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};
