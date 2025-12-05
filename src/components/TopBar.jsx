import React from 'react';

const roles = [
  'Gerente de proyecto',
  'Analista de negocio',
  'Desarrollador',
];

function TopBar({ activeRole, onRoleChange }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Spec Manager</p>
        <h1>Github Spec + AWS Kiro Spec</h1>
        <p className="muted">
          Panel unificado para describir, validar y desplegar especificaciones en Amplify
          con autenticación Cognito y persistencia DynamoDB.
        </p>
      </div>
      <div className="role-picker">
        <label htmlFor="role">Rol activo</label>
        <select id="role" value={activeRole} onChange={(e) => onRoleChange(e.target.value)}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default TopBar;
