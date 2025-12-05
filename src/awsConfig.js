export const cognitoConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_example',
  userPoolClient: 'exampleclientid',
  domain: 'specapp.auth.us-east-1.amazoncognito.com',
  groups: ['Gerente de proyecto', 'Analista de negocio', 'Desarrollador'],
  selfSignUpEnabled: false,
};

export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolClient,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: { preferred_username: true },
      allowGuestAccess: false,
    },
  },
  API: {
    REST: {
      specApi: {
        endpoint: 'https://api.example.com',
        region: cognitoConfig.region,
      },
    },
  },
};
