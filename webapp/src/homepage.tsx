
import {useNavigate} from 'react-router-dom'
import Fido2Toast from './fidoAuth';
import { usePasswordless } from "amazon-cognito-passwordless-auth/react";


function HomePage() {
  const navigate = useNavigate();
  const {signOut} = usePasswordless();
  
  const handleSubmit = () => {
    (() => signOut())();
    navigate('/');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to our Website!</h1>
      <p>Add passkey for better authentication</p>
      <Fido2Toast />
      <br/>
      <button onClick={handleSubmit}>Sign out</button>
    </div>
  );
}

export default HomePage;