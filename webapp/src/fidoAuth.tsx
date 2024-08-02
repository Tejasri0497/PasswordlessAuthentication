// import {useState} from 'react';
// import { usePasswordless } from "amazon-cognito-passwordless-auth/react";

// export default function YourComponent() {
//   const { fido2CreateCredential } = usePasswordless();
  
//   const [showForm, setShowForm] = useState(false);
   
//   const toggleForm = () => {
//     setShowForm(!showForm); // Toggle the state to show/hide the form
//   };
  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fido2CreateCredential({
//       friendlyName: event.currentTarget.friendlyName.value,
//     })
//     .then((credential) => {
//       // Handle credential creation success
//       console.log(credential);
//     })
//     .catch((error) => {
//       // Handle credential creation failure
//       console.error("Failed to create credential:", error);
//     });
//   };
  
//   console.log("event.currentTarget.friendlyName.value", event);

//   return (
//   <div>
//     <button onClick={toggleForm}>Add Authentication</button>
//     {showForm && (<form
//       onSubmit={(event) => {
//         fido2CreateCredential({
//           friendlyName: "xyz"
//         }).then((credential) => {
//           //  The credential object will look like this:
//           //  credential = {
//           //    credentialId: string;
//           //    friendlyName: string;
//           //    createdAt: Date;
//           //    lastSignIn?: Date;
//           //    signCount: number;
//           //    update: (friendlyName: string) => void; // function to update the friendlyName
//           //    delete: () => void; // function to delete the credential
//           //    busy: boolean; // set to true if the credential is being updated or deleted
//           //  }
//           console.log(credential);
//         });
//         event.preventDefault();
//       }}
//     >
//       <input type="text" placeholder="Device name" name="friendlyName" />
//       <input type="submit" value="Create new FIDO2 credential" />
//     </form> )
      
//     }
//   </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { usePasswordless } from "amazon-cognito-passwordless-auth/react";

// export default function YourComponent() {
//   const { fido2CreateCredential, fido2Credentials } = usePasswordless();
  
//   const [showForm, setShowForm] = useState(false);
//   const [credentials, setCredentials] = useState([]);

//   useEffect(() => {
//     // Initialize credentials from existing fido2Credentials
//     if (fido2Credentials && fido2Credentials.length > 0) {
//       setCredentials(fido2Credentials);
//     }
//   }, [fido2Credentials]);

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const friendlyName = event.currentTarget.friendlyName.value;

//     fido2CreateCredential({
//       friendlyName: friendlyName || "Default Authenticator Name"
//     })
//     .then((credential) => {
//       const updatedCredentials = [...credentials, credential];
//       setCredentials(updatedCredentials);
//       setShowForm(false);
//     })
//     .catch((error) => {
//       console.error("Failed to create credential:", error);
//     });
//   };

//   const handleDeleteCredential = (index) => {
//     const credentialToDelete = credentials[index];

//     // Call delete method on the credential object
//     credentialToDelete.delete()
//       .then(() => {
//         // Remove the credential from state
//         const updatedCredentials = credentials.filter((cred, idx) => idx !== index);
//         setCredentials(updatedCredentials);
//       })
//       .catch((error) => {
//         console.error("Failed to delete credential:", error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={toggleForm}>Add Authentication</button>
//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Device name" name="friendlyName" />
//           <input type="submit" value="Create new FIDO2 credential" />
//         </form>
//       )}

//       {credentials.length > 0 && (
//         <div>
//           <h3>Created Credentials:</h3>
//           <ul>
//             {fido2Credentials.map((credential, index) => (
//               <li key={credential.credentialId}>
//                 <span>{credential.friendlyName}</span>
//                 <button onClick={() => handleDeleteCredential(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { usePasswordless, useLocalUserCache } from "amazon-cognito-passwordless-auth/react";

export default function Fido2Toast() {
  const { fido2CreateCredential, fido2Credentials, signInStatus, currentUser,  } = usePasswordless();
  
  const { lastSignedInUsers } = useLocalUserCache();
  
  const [showForm, setShowForm] = useState(false);
  const [friendlyName, setFriendlyName] = useState("");

  useEffect(() => {
    // Fetch or update credentials based on user's sign-in status or currentUser
    if (signInStatus === "SIGNED_IN" && lastSignedInUsers) {
      // Example: Fetch credentials for the current user
      // This could be part of initialization or triggered on specific events
    }
  }, [signInStatus, lastSignedInUsers]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const friendlyName = event.currentTarget.friendlyName.value;

    fido2CreateCredential({
      friendlyName: friendlyName || "Default Authenticator Name"
    })
    .then((credential) => {
      // Handle successful creation (optional)
      setShowForm(false);
      // Optionally update fido2Credentials state to trigger re-render
      // You may need to handle state update here
    })
    .catch((error) => {
      console.error("Failed to create credential:", error);
    });
  };

  const handleDeleteCredential = (credential) => {
    credential.delete()
      .then(() => {
        // Handle successful deletion (optional)
        // Optionally update fido2Credentials state to trigger re-render
      })
      .catch((error) => {
        console.error("Failed to delete credential:", error);
      });
  };

  return (
    <div>
      <button onClick={toggleForm}>Add Authentication</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Device name" name="friendlyName" />
          <input type="submit" value="Create new FIDO2 credential" />
        </form>
      )}

      {fido2Credentials && fido2Credentials.length > 0 && (
        <div>
          <h3>Created Credentials:</h3>
          <ul>
            {fido2Credentials.map((credential) => (
              <li key={credential.credentialId}>
                {credential.friendlyName}
                <button onClick={() => handleDeleteCredential(credential)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { usePasswordless, useLocalUserCache } from "amazon-cognito-passwordless-auth/react";

// export default function Fido2Toast() {
//   const { fido2CreateCredential, fido2Credentials, signInStatus } = usePasswordless();
  
  
//   const [showForm, setShowForm] = useState(false);
//   const [friendlyName, setFriendlyName] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch or update credentials based on user's sign-in status or currentUser
//     if (fido2Credentials !== undefined) {
//       // Example: Fetch credentials for the current user
//       // This could be part of initialization or triggered on specific events
//       // Replace the console.log with your actual fetch logic
//       setLoading(false)
//     }
//   }, []);
  
//   // console.log("fido2Credentials", fido2Credentials)
//   // console.log("currentUser", currentUser)
//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const friendlyName = event.currentTarget.friendlyName.value;

//     fido2CreateCredential({
//       friendlyName: friendlyName || "Default Authenticator Name"
//     })
//     .then((credential) => {
//       // Handle successful creation
//       setShowForm(false);
//       // Optionally update fido2Credentials state to trigger re-render
//       // This depends on how fido2Credentials state is managed by usePasswordless
//     })
//     .catch((error) => {
//       console.error("Failed to create credential:", error);
//     });
//   };

//   const handleDeleteCredential = (credential) => {
//     credential.delete()
//       .then(() => {
//         // Handle successful deletion
//         // Optionally update fido2Credentials state to trigger re-render
//       })
//       .catch((error) => {
//         console.error("Failed to delete credential:", error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={toggleForm}>Add Authentication</button>
//       <br/>
//       <br/>
//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Device name" name="friendlyName" />
//           <input type="submit" value="Create new FIDO2 credential" />
//         </form>
//       )}

//       {loading ? (<div>Loading FIDO2 credentials...</div>)
//       : fido2Credentials.length === 0 ? (
//         <div>No credentials registered yet.</div>
//       ) : (
//         <div>
//           <h4>Created Credentials:</h4>
//           <ul>
//             {fido2Credentials.map((credential) => (
//               <li key={credential.credentialId}>
//                 {credential.friendlyName}
//                 <button onClick={() => handleDeleteCredential(credential)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
