import React from 'react';

function SchemaCallout({ schema }) {
  return (
    <div className="card subdued">
      <div className="card-header">
        <div>
          <p className="eyebrow">DynamoDB</p>
          <h2>Modelo de tabla</h2>
          <p className="muted">
            Usa una sola tabla con claves compuestas para proyectos y especificaciones.
            Las GSIs permiten consultas por estado y propietario.
          </p>
        </div>
        <div className="tag">Serverless</div>
      </div>

      <div className="schema-grid">
        <div>
          <p className="eyebrow">Tabla</p>
          <h4>{schema.tableName}</h4>
          <p className="muted">{schema.description}</p>
        </div>
        <div>
          <p className="eyebrow">Clave primaria</p>
          <ul className="bullets">
            <li>PK: {schema.partitionKey}</li>
            <li>SK: {schema.sortKey}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">GSIs</p>
          <ul className="bullets">
            {schema.gsis.map((gsi) => (
              <li key={gsi.name}>
                {gsi.name}: {gsi.partitionKey} | {gsi.sortKey}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Accesos</p>
          <ul className="bullets">
            <li>Gerente: CRUD y despliegue</li>
            <li>Analista: CRUD</li>
            <li>Desarrollador: lectura y comentarios</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SchemaCallout;
