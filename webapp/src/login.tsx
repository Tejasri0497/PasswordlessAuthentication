
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePasswordless, useLocalUserCache} from "amazon-cognito-passwordless-auth/react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './states/userPool';


type StoredUser = {
    username: string;s
    email?: string;
    useFido?: "YES" | "NO" | "ASK";
    credentials?: {
        id: string;
        transports?: AuthenticatorTransport[];
    }[];
};

function LoginForm() {
  const navigate = useNavigate();
  const { signInStatus, signingInStatus, authenticateWithFido2, requestSignInLink, lastError } = usePasswordless();
  
  const { lastSignedInUsers, currentUser } = useLocalUserCache();
  
  const [lastUser, setLastUser] = useState<StoredUser | null>(null); // Initialize with null or handle undefined

console.log("current", currentUser)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Store currentUser in localStorage
    }
  }, [currentUser, navigate]);
  
  useEffect(() => {
        if (lastSignedInUsers && lastSignedInUsers.length > 0) {
            setLastUser(lastSignedInUsers[0]); // Set the first user as the last user
        } else {
            setLastUser(null); // Handle case where no users are available
        }
    }, [lastSignedInUsers]);// Update when lastSignedInUsers changes
    
    
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  
  const [showSignInOptionsForUser, setShowSignInOptionsForUser] = useState<
    "LAST_USER" | "NEW_USER_ENTRY" | "NEW_USER"
  >("LAST_USER");
  
  
  if (signInStatus === "SIGNED_IN") {
    // reset state fields for entering new username
    if (email) {
      setEmail("");
    }
    if (showSignInOptionsForUser !== "LAST_USER") {
      setShowSignInOptionsForUser("LAST_USER");
    }
  }
  
  
  console.log("lastSignInUser", lastSignedInUsers);
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.name === 'loginWithPassword') {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          localStorage.setItem('lastSignedInUser', email);
          navigate('/homepage');
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data);
        },
      });
    // } else if (event.target.name === 'fido2') {
    //   authenticateWithFido2({
    //     username: email,
    //   });
    } else if (event.target.name === 'magiclink') {
      requestSignInLink({
        username: email,
        redirectUri: "https://43649bbee2dc4c939df8c0734f18d394.vfs.cloud9.us-east-1.amazonaws.com//homepage" // Update with your actual redirect URI
      });
    }
  };


  const user: typeof lastUser =
    email && showSignInOptionsForUser === "NEW_USER"
      ? {
          email: email,
          username: email,
          useFido: "YES"
        }
      : showSignInOptionsForUser === "LAST_USER"
        ? lastUser
        : undefined;
        
        
  const handleFido2 = () => {
    console.log("user inside fido2", user);
    (user) ? 
    authenticateWithFido2({
        username: user.username,
        credentials: user.credentials,
    }) : authenticateWithFido2();
  }
  console.log("user is", user);
  console.log("signingInStatus", signingInStatus);
  console.log("signIn", signInStatus)
  // STARTING_SIGN_IN_WITH_FIDO2 || 
  
  // if(signingInStatus === "COMPLETING_SIGN_IN_WITH_FIDO2" || signingInStatus === "STARTING_SIGN_IN_WITH_FIDO2") {
  //   return(<>Signing in....please wait</>)
  // }
  
  if(signingInStatus === "SIGNED_IN_WITH_FIDO2") {
    navigate('./homepage')
  }


  return (
    <div className="addUser">
      <h3>Sign In</h3>
      <form className="addUserForm" onSubmit={(e) => {
        e.preventDefault();
        setShowSignInOptionsForUser("NEW_USER");
      }}>
        <div className="inputGroup">
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name="email"
            placeholder='Enter Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name="password"
            id='password'
            placeholder='Enter Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type='submit' className='btn btn-primary' name="loginWithPassword" onClick={handleSubmit}>Login</button>
          <button type='submit' className='btn btn-primary' name="fido2" onClick={handleFido2}>Login with passkey</button>
          <button type='submit' className='btn btn-primary' name="magiclink" onClick={handleSubmit}>Login with magiclink</button>
        </div>
      </form>
      <p className='text-center mt-3'>Don't have an account?
        <Link to='./signup' className='ms-2'>Sign up</Link>
      </p>
      {signingInStatus === "COMPLETING_SIGN_IN_WITH_FIDO2" || signingInStatus === "STARTING_SIGN_IN_WITH_FIDO2" && (
        <div>Completing sign-in...</div>
      )}
      {lastError && (
          <div className="passwordless-error">{lastError.message}</div>
      )}    
    </div>
  );
}

export default LoginForm;
