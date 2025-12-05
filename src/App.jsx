import React, { useState } from 'react';
import TopBar from './components/TopBar';
import SpecEditor from './components/SpecEditor';
import ProjectBoard from './components/ProjectBoard';
import UserAdminPanel from './components/UserAdminPanel';
import AuthBanner from './components/AuthBanner';
import SchemaCallout from './components/SchemaCallout';
import IntegrationCards from './components/IntegrationCards';
import { dynamoSchema } from './services/dynamodbSchema';
import { cognitoConfig } from './awsConfig';

const starterProjects = [
  {
    id: 'proj-kiro-sso',
    name: 'Portal AWS Kiro Spec',
    description:
      'Experiencias de captura y validación de especificaciones con Kiro Spec y Github Spec. Incluye autenticación y panel de roles.',
    specs: [
      {
        id: 'spec-001',
        title: 'Autenticación Cognito + Amplify',
        status: 'En curso',
        format: 'Markdown',
        owner: 'Gerente de proyecto',
        summary: 'Inicio de sesión federado y sin autoregistro.',
      },
    ],
  },
  {
    id: 'proj-github-spec',
    name: 'Catálogo Github Spec',
    description:
      'Plantillas y validaciones de historias en Github Spec, con compatibilidad con AWS Kiro Spec.',
    specs: [
      {
        id: 'spec-002',
        title: 'Definición de estados del tablero',
        status: 'Borrador',
        format: 'Markdown',
        owner: 'Analista de negocio',
        summary: 'Workflow de aprobación y publicación en DynamoDB.',
      },
    ],
  },
];

function App() {
  const [projects, setProjects] = useState(starterProjects);
  const [activeRole, setActiveRole] = useState('Gerente de proyecto');

  const addSpec = (payload) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === payload.projectId
          ? {
              ...project,
              specs: [
                ...project.specs,
                {
                  id: `spec-${project.specs.length + 1}`,
                  title: payload.title,
                  status: 'Borrador',
                  format: payload.format,
                  owner: activeRole,
                  summary: payload.summary,
                },
              ],
            }
          : project,
      ),
    );
  };

  return (
    <div className="page">
      <TopBar onRoleChange={setActiveRole} activeRole={activeRole} />
      <main className="layout">
        <section className="column">
          <AuthBanner cognitoConfig={cognitoConfig} />
          <IntegrationCards />
          <SpecEditor projects={projects} onSubmit={addSpec} />
        </section>

        <section className="column">
          <ProjectBoard projects={projects} activeRole={activeRole} />
          <SchemaCallout schema={dynamoSchema} />
          <UserAdminPanel cognitoConfig={cognitoConfig} />
        </section>
      </main>
    </div>
  );
}

export default App;
