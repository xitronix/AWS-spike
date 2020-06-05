import React, { useEffect, useState } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import { awsconfig } from './aws-exports';
import './App.css';
import AWS, { KMS, CognitoIdentity, CognitoIdentityCredentials } from 'aws-sdk';
import { getPublicKeyData } from './aws-spike';

Amplify.configure(awsconfig);
// Configure the credentials provider to use your identity pool
// AWS.config.credentials = new CognitoIdentityCredentials({
//   IdentityPoolId: 'us-west-2_Eu9t4ZxIw',
//   Logins: { // optional tokens, used for authenticated login
//       'graph.facebook.com': 'FBTOKEN',
//       'www.amazon.com': 'AMAZONTOKEN',
//       'accounts.google.com': 'GOOGLETOKEN',
//       'appleid.apple.com': 'APPLETOKEN'
//   }
// });

// Make the call to obtain credentials

function App() {
  const [cognitoUser, setCognitoUser] = useState<any>(null);
  const [awsCredentials, setAwsCredentials] = useState<any>(null);

  const signIn = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: false });
      console.log({ user: user })
      // AWS.config.credentials?.get(() => {
      //   setAwsCredentials({
      //     accessKeyId: AWS.config.credentials?.accessKeyId,
      //     secretAccessKey: AWS.config.credentials?.secretAccessKey,
      //     sessionToken: AWS.config.credentials?.sessionToken,
      //   })
      //   console.log({awsCredentials})

      // });
      setCognitoUser(user);
      if (user) {
        console.log({ credentials: Auth.userAttributes(user) })
        const userSession = await Auth.userSession(user);
        console.log({userSession})
        console.log(userSession.getAccessToken())
      }
    } catch {
      console.log('error', { user: null })
      setCognitoUser(null)
    }
  }
  const handleKmsClick = () => {
    const cognitoIdentity = new CognitoIdentity({ region: 'us-west-2' });
    console.log({ cognitoIdentity })
    const params = {
      IdentityId: cognitoUser.getSignInUserSession().identityId,
    };
    cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });
  }
  useEffect(() => { signIn() }, []);

  if (cognitoUser) {
    return <div>
      <h3> Signed in</h3>
      <button onClick={() => Auth.signOut()}> Sign Out</button>
      <button onClick={handleKmsClick}> Create CMK </button>
      {/* <AmplifySignOut /> */}
    </div>
  }
  return (
    <div className="App">
      <button onClick={() => {
        Auth.federatedSignIn({ provider: 'Google' as any }).then((user) => setCognitoUser(user));
      }}> Open with google</button>
    </div>
  );
}

export default App;
