import AccountContext from '../Context/AccountContext';
import userPool from './userPool';
import React from 'react';

const AccountState = (props) => {
    
    //user registration
    const signup = async (email, password, lastName, firstName) => {
        return await new Promise((resolve, reject) => {
            const attributeList = [];
            var dataFirstName = {
                Name: 'first_name',
                Value: firstName
            }
            
            var dataGivenName = {
                Name: "given_name",
                Value: firstName
            }
        
           attributeList.push(dataFirstName);
           attributeList.push(dataGivenName);
        
            userPool.signUp(email, password, attributeList, null, (err, data) => {
                if(err) {
                    console.log("Failed to register", err.message);
                    reject();
                }
                else {
                    console.log("Account created successfully", data);
                    resolve();
                }
            })
        })
    }
    
    
    
    return (
        <AccountContext.Provider value={{signup}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;
