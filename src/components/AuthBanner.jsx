import React from 'react';

function AuthBanner({ cognitoConfig }) {
  return (
    <div className="card neutral">
      <div>
        <p className="eyebrow">Autenticación Cognito</p>
        <h2>Amplify + User Pool</h2>
        <p className="muted">
          Configura el cliente sin permitir autoregistro y habilita MFA opcional. Los grupos
          controlan el acceso a ediciones y despliegues.
        </p>
        <ul className="bullets">
          <li>Dominio: {cognitoConfig.domain || 'pendiente de configurar'}</li>
          <li>App client: {cognitoConfig.userPoolClient || 'por definir'}</li>
          <li>Pool: {cognitoConfig.userPoolId || 'por definir'}</li>
        </ul>
      </div>
      <div className="auth-steps">
        <div className="tag">Grupos</div>
        <ol>
          {cognitoConfig.groups.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ol>
        <p className="muted">Asigna permisos desde AWS Cognito o mediante la UI de administración.</p>
      </div>
    </div>
  );
}

export default AuthBanner;
