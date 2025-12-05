import React from 'react';

function IntegrationCards() {
  return (
    <div className="integration-grid">
      <div className="card compact">
        <p className="eyebrow">Github Spec</p>
        <h3>Plantillas reutilizables</h3>
        <p className="muted">
          Registra historias y criterios en formato Markdown y valida el DSL antes de sincronizar
          con repositorios mediante GitHub Actions.
        </p>
        <ul className="bullets">
          <li>Bloques <code>Contexto</code>, <code>Decisiones</code>, <code>Riesgos</code></li>
          <li>Compatibilidad con issue forms</li>
          <li>Versionado en DynamoDB (SK por estado)</li>
        </ul>
      </div>
      <div className="card compact">
        <p className="eyebrow">AWS Kiro Spec</p>
        <h3>Validación asistida</h3>
        <p className="muted">
          Enlaza los atributos de Kiro Spec (objetivo, métricas, datos) y guarda los snapshots en
          DynamoDB para auditoría.
        </p>
        <ul className="bullets">
          <li>Campos obligatorios y tags de seguridad</li>
          <li>Traza de aprobación por rol</li>
          <li>Listo para desplegar en Amplify</li>
        </ul>
      </div>
    </div>
  );
}

export default IntegrationCards;
