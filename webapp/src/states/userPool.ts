import {CognitoUserPool} from 'amazon-cognito-identity-js';



const poolData = {
    UserPoolId: "us-east-1_9PajWV4x6",
    ClientId: "74dedeoj4oh8b4rftader6rjf3",
}


export default new CognitoUserPool(poolData);