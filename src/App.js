import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: '123',
      url: "https://github.com/Rocketseat/umbriel",
      title: "conceitos-reactjs",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // app.delete("/repositories/:id"
    api.delete(`repositories/${id}`);
    const newRepo = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>{repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
