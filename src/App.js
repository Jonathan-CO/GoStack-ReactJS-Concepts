import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
      .catch(error => console.log(error));
  }, []);



  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio ReactJS`,
      url: "http://github.com/Jonathan-CO",
      techs: ["NodeJS", "ReactJS"]
    });
    if (response.data) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.length > 0 && repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
