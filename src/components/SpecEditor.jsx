import React, { useState } from 'react';

const formats = ['Markdown', 'Github Spec DSL', 'AWS Kiro Spec'];

function SpecEditor({ projects, onSubmit }) {
  const [form, setForm] = useState({
    projectId: projects[0]?.id ?? '',
    title: '',
    summary: '',
    format: formats[0],
    content: '',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.title || !form.projectId) return;
    onSubmit(form);
    setForm((prev) => ({ ...prev, title: '', summary: '', content: '' }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Editor de especificaciones</p>
          <h2>Compatible con Github Spec y AWS Kiro Spec</h2>
          <p className="muted">
            Escribe en texto libre, Markdown o el DSL de Github Spec. Usa bloques
            <code>## Contexto</code>, <code>### Criterios</code> y <code>### Seguridad</code> para alineación con Kiro Spec.
          </p>
        </div>
        <div className="badge">Sin autoregistro</div>
      </div>

      <form className="form" onSubmit={submit}>
        <label>
          Proyecto destino
          <select value={form.projectId} onChange={(e) => update('projectId', e.target.value)}>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Título de la especificación
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Ej. Integración con Cognito y grupos"
          />
        </label>

        <label>
          Resumen
          <input
            value={form.summary}
            onChange={(e) => update('summary', e.target.value)}
            placeholder="Propósito, alcance y responsable"
          />
        </label>

        <label>
          Formato permitido
          <div className="pill-group">
            {formats.map((format) => (
              <button
                type="button"
                key={format}
                className={form.format === format ? 'pill active' : 'pill'}
                onClick={() => update('format', format)}
              >
                {format}
              </button>
            ))}
          </div>
        </label>

        <label>
          Detalle
          <textarea
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
            placeholder={
              '## Contexto\n- Describe el problema...\n\n### Criterios\n- [ ] Listado de aceptación\n\n### Seguridad\n- Grupos de Cognito requeridos'
            }
            rows={8}
          />
        </label>

        <button type="submit" className="primary">
          Guardar especificación
        </button>
      </form>
    </div>
  );
}

export default SpecEditor;
