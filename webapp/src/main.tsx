import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  PasswordlessContextProvider,
  // Passwordless as PasswordlessComponent,
  // Fido2Toast,
} from "amazon-cognito-passwordless-auth/react";
import { Passwordless } from "amazon-cognito-passwordless-auth"
// import {
//   PasswordlessContextProvider,
//   Fido2Toast,
// } from "amazon-cognito-passwordless-auth/react";


Passwordless.configure({
  clientId: "74dedeoj4oh8b4rftader6rjf3", //replace with client id attribute in the CloudFormation output
  cognitoIdpEndpoint: "us-east-1", //replace with region, e.g. "us-east-1"
  debug: console.trace,
  fido2: {
    baseUrl: "https://bzci4c3jhj.execute-api.us-east-1.amazonaws.com/v1/", //replace with the Fido2Url attribute in the CloudFormation output
    authenticatorSelection: {
      userVerification: "required",
    },
  },
  userPoolId: "us-east-1_9PajWV4x6"
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <PasswordlessContextProvider enableLocalUserCache={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </PasswordlessContextProvider>

)
