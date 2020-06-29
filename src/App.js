import React, {useState, useEffect} from "react";
import api from 'services/api'

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect( () => {
      api.get('repositories').then( response => {
        setProjects(response.data);
      });
    }, []
  );

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Teste title posição 1 ${Date.now()}`
    })

    const project = response.data;

    setProjects([... projects, project]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
        
    const projectIndex = projects.findIndex(project => project.id === id);

    const project = projects.splice(projectIndex, 1);

    setProjects([...projects]);

  }

  return (
    <div>
                  <ul data-testid="repository-list">
                {projects.map(project =>
                <div key={project.id}>
                <br />
                    <li>
                        {project.title}
                    </li>        
                    <button type='button' onClick={() => handleRemoveRepository(project.id)}>
                            Remover
                    </button>
                </div>
                )}
            </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
