export const dynamoSchema = {
  tableName: 'specapp-projects',
  description: 'Tabla única para proyectos y especificaciones compatibles con Github Spec y AWS Kiro Spec.',
  partitionKey: 'PK (PROJECT#<projectId>)',
  sortKey: 'SK (SPEC#<specId>#<status>)',
  gsis: [
    { name: 'GSI1', partitionKey: 'STATUS#<status>', sortKey: 'UPDATED_AT' },
    { name: 'GSI2', partitionKey: 'OWNER#<role>', sortKey: 'PROJECT#<projectId>' },
  ],
  iam: {
    manager: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
    analyst: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:UpdateItem'],
    developer: ['dynamodb:Query'],
  },
};

export const exampleItem = {
  PK: 'PROJECT#proj-kiro-sso',
  SK: 'SPEC#spec-001#APPROVED',
  title: 'Autenticación Cognito + Amplify',
  format: 'Markdown',
  state: 'APPROVED',
  owner: 'Gerente de proyecto',
  updatedAt: new Date().toISOString(),
};
