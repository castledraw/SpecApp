import React, { useState } from 'react';
import { cognitoService } from '../services/cognitoService';

function UserAdminPanel({ cognitoConfig }) {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    role: 'Gerente de proyecto',
  });

  const update = (key, value) => setUserForm((prev) => ({ ...prev, [key]: value }));

  const createUser = async (event) => {
    event.preventDefault();
    await cognitoService.createUser(userForm);
    setUserForm({ username: '', email: '', role: 'Gerente de proyecto' });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Administración Cognito</p>
          <h2>Usuarios y grupos</h2>
          <p className="muted">
            La aplicación deshabilita el autoregistro y sólo permite invitar usuarios mediante
            el grupo correspondiente: <strong>{cognitoConfig.groups.join(', ')}</strong>.
          </p>
        </div>
        <div className="badge">IAM mínimo privilegio</div>
      </div>

      <form className="form" onSubmit={createUser}>
        <label>
          Usuario
          <input
            value={userForm.username}
            onChange={(e) => update('username', e.target.value)}
            placeholder="usuario.ejemplo"
          />
        </label>
        <label>
          Correo corporativo
          <input
            type="email"
            value={userForm.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="persona@empresa.com"
          />
        </label>
        <label>
          Rol / Grupo Cognito
          <select value={userForm.role} onChange={(e) => update('role', e.target.value)}>
            {cognitoConfig.groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="primary">Invitar y asignar grupo</button>
      </form>
    </div>
  );
}

export default UserAdminPanel;
