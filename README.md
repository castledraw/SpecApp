# SpecApp - Gestor de especificaciones Github Spec + AWS Kiro Spec

Aplicación React para capturar, clasificar y publicar especificaciones compatibles con Github Spec y AWS Kiro Spec. Incluye flujos de autenticación con AWS Cognito, almacenamiento en DynamoDB y controles de administración por rol.

## Funcionalidades clave
- Editor de especificaciones con formatos permitidos (Markdown, Github Spec DSL y AWS Kiro Spec) y bloques sugeridos para contexto, criterios y seguridad.
- Tablero de proyectos que agrupa especificaciones por `ProjectId` y muestra estados alineados con claves de DynamoDB.
- Administración de usuarios y grupos de Cognito (gerente de proyecto, analista de negocio, desarrollador) con autoregistro deshabilitado.
- Sección de integración para Github Spec y AWS Kiro Spec, con énfasis en despliegue en AWS Amplify.

## Configuración de AWS Amplify y Cognito
1. Crear un **User Pool** en Cognito y deshabilitar el **autoregistro** (`AllowSelfRegistration = false`).
2. Crear un **App Client** sin secreto y registrar el dominio hospedado (por ejemplo `specapp.auth.us-east-1.amazoncognito.com`).
3. Crear grupos: `Gerente de proyecto`, `Analista de negocio`, `Desarrollador`.
4. Configurar MFA opcional y atributos requeridos (`email`, `preferred_username`).
5. Actualizar `src/awsConfig.js` con `region`, `userPoolId`, `userPoolClient` y `domain` reales.
6. En Amplify, agregar la categoría Auth (`amplify add auth`) respetando los grupos anteriores y desplegar (`amplify push`).

### Administración de usuarios desde la app
- La UI de **Administración Cognito** permite invitar usuarios y asignarlos al grupo adecuado. Implementa las llamadas usando `cognitoService.createUser` para conectar con tus funciones API o Lambdas protegidas con IAM.
- Los roles controlan el acceso a la edición y despliegue; los desarrolladores sólo consumen especificaciones.

## Esquema de DynamoDB
Se utiliza una **tabla única** para proyectos y especificaciones.

- **Nombre**: `specapp-projects`
- **PK**: `PROJECT#<projectId>`
- **SK**: `SPEC#<specId>#<status>` (permite versionado por estado)
- **GSI1**: `STATUS#<status>` | `UPDATED_AT` (consultas por estado)
- **GSI2**: `OWNER#<role>` | `PROJECT#<projectId>` (consultas por propietario/rol)
- **Atributos recomendados**: `summary`, `format`, `content`, `updatedAt`, `securityTags`, `kiroAttributes`
- **IAM sugerido**:
  - Gerente de proyecto: `dynamodb:PutItem`, `Query`, `UpdateItem`, `DeleteItem`
  - Analista de negocio: `dynamodb:PutItem`, `Query`, `UpdateItem`
  - Desarrollador: `dynamodb:Query`

### Ejemplo de item
```json
{
  "PK": "PROJECT#proj-kiro-sso",
  "SK": "SPEC#spec-001#APPROVED",
  "title": "Autenticación Cognito + Amplify",
  "format": "Markdown",
  "state": "APPROVED",
  "owner": "Gerente de proyecto",
  "updatedAt": "2024-05-01T10:00:00Z"
}
```

## Desarrollo local
1. Instala Node.js 18+.
2. Ejecuta `npm install`.
3. Lanza la app con `npm run dev`.
4. Para compilación de Amplify en CI/CD usa `npm run build`.

## Despliegue con AWS Amplify
- Conecta el repositorio a Amplify Console.
- Define variables de entorno (`VITE_USER_POOL_ID`, `VITE_USER_POOL_CLIENT_ID`, etc.) o reemplaza los valores en `src/awsConfig.js` durante el build.
- Amplify genera hosting estático y CI/CD; agrega un backend con **Auth** y **API (REST o GraphQL)** para persistir en DynamoDB mediante Lambdas con permisos mínimos.
