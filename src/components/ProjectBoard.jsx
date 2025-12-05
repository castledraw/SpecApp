import React from 'react';

function SpecRow({ spec }) {
  return (
    <div className="spec-row">
      <div>
        <p className="eyebrow">{spec.owner}</p>
        <h4>{spec.title}</h4>
        <p className="muted">{spec.summary}</p>
      </div>
      <div className="spec-meta">
        <span className="tag">{spec.format}</span>
        <span className={`status status-${spec.status.toLowerCase().replace(' ', '-')}`}>
          {spec.status}
        </span>
      </div>
    </div>
  );
}

function ProjectBoard({ projects, activeRole }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Proyectos</p>
          <h2>Tablero y estados</h2>
          <p className="muted">
            Agrupa las especificaciones en DynamoDB por <strong>ProjectId</strong> y
            <strong> SpecId</strong>. Los estados se usan como sort key para flujos de aprobación.
          </p>
        </div>
        <div className="badge secondary">Rol actual: {activeRole}</div>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="project-block">
          <div className="project-header">
            <div>
              <p className="eyebrow">{project.id}</p>
              <h3>{project.name}</h3>
              <p className="muted">{project.description}</p>
            </div>
            <div className="tag">{project.specs.length} especificaciones</div>
          </div>
          <div className="spec-list">
            {project.specs.map((spec) => (
              <SpecRow key={spec.id} spec={spec} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectBoard;
