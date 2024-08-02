import  {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css";
import  UserPool  from './states/userPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';




function SignUpForm() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
 


    
  const handleSubmit = async(event: any) => {
    
      event.preventDefault();
      const attributeList = [];
       const dataFirstName = new CognitoUserAttribute({
          Name: 'given_name',
          Value: firstName
        });

        const dataFamilyName = new CognitoUserAttribute({
           Name: 'family_name',
           Value: lastName
        });
      // var dataFirstName = {
      //   Name: 'given_name',
      //   Value: firstName
      // }
            
      // var dataFamilyName = {
      //   Name: "family_name",
      //   Value: lastName
      // }
        
      attributeList.push(dataFirstName);
      attributeList.push(dataFamilyName);      
      
      UserPool.signUp(email, password, attributeList, [], (err, data) => {
        if(err) {
          console.log(err);
        } else {
            console.log(data);
            navigate('/homepage');
        }

      });
      
      // signup(email, password, firstName, lastName)
      // .then(data => {
      //     console.log("Registered Successfully", data);
        
      // }).catch(err => {
      //   console.log("Failed to register", err.message);
      // })
      
      // await signUp({
      //   email: email,
      //   password: password,
      //   options: {
      //     userAttributes: {
      //       given_name: firstName,
      //       family_name: lastName
      //     },
      //   },
      // });
      
      

      // const username = event.target.username.value;
      // const password = event.target.password.value;

    // Example logic to determine which authentication method to use
    // Replace this with your actual logic based on application requirements
      // const shouldUseSRP = false; // Example condition, replace with actual logic

      // if (shouldUseSRP) {
      //     authenticateWithSRP({ username, password });
      //   } else {
      //     authenticateWithPlaintextPassword({ username, password });
      //   }
  };
  


  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor='firstname'>FirstName:</label>
          <input 
            type='text'
            name="firstname"
            id='firstname' 
            placeholder='Enter FirstName' 
            value={firstName} 
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor='lastname'>LastName:</label>
          <input 
            type='text'
            name="lastname"
            id='lastname' 
            placeholder='Enter LastName' 
            value={lastName} 
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor='email'>Email:</label>
          <input 
            type='email'
            name="username"
            id='email' 
            placeholder='Enter Email' 
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input 
            type='password'
            name="password"
            id='password' 
            placeholder='Create Password' 
            value={password} 
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Sign up</button>
        </div>
      </form>
          <p className='text-end mt-3' style={{ marginRight: '19px' }}>Already have an account?
            <Link to='/' className='ms-2'>Sign in</Link>
          </p>
    </div>
  )
}

export default SignUpForm;
