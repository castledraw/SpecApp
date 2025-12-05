import { Amplify, Auth } from 'aws-amplify';
import { amplifyConfig, cognitoConfig } from '../awsConfig';

Amplify.configure(amplifyConfig);

export const cognitoService = {
  async signIn(username, password) {
    return Auth.signIn({ username, password });
  },
  async signOut() {
    return Auth.signOut();
  },
  async createUser({ username, email, role }) {
    // Requiere credenciales con permisos de administración de usuarios.
    // Para asignar grupos usa un Lambda/API protegido que llame AdminAddUserToGroup.
    const result = await Auth.signUp({
      username,
      password: Math.random().toString(36),
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: { enabled: false },
      },
    });

    return { ...result, requestedGroup: role };
  },
  async currentUser() {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      return null;
    }
  },
  groups: cognitoConfig.groups,
};
