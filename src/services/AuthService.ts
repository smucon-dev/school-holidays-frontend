import { User } from "../app/model"
import Amplify, { Auth } from 'aws-amplify'
import { appConfig } from './config'
import { CognitoUser } from '@aws-amplify/auth'


Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: appConfig.REGION,
    userPoolId: appConfig.USER_POOL_ID,
    userPoolWebClientId: appConfig.APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
})


export class AuthService {

  public async login(userName: string, password: string): Promise<User | undefined> {
    
    try {
      const user = await Auth.signIn(userName, password) as CognitoUser
      return {
        userName: user.getUsername(),
        cognitoUser: user
      };
    } catch {
      return undefined
    }
  }

}