import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

import Header from './components/Header';


/**
 * Componente
 * Propriedade é alguma informação que pode passar do componente Pai para o componente filho
 * Estado & Imutabilidade
 * 
 * https://www.notion.so/Front-End-React-dc5862dfa23b4bd79852a7d8803cb2e6
 */

function App (){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);


// UseState retorna um array com 2 posições

// 1. Variável com seu valor inicial
// 2. Função para atualizarmos esse valor

async  function handleAddProject(){
//     projects.push(`Novo projeto ${Date.now()}`);
//setProjects([...projects, (`Novo projeto ${Date.now()}`)]);
//   console.log(projects);

const response = await api.post('projects', {
	title: `Novo projeto ${Date.now()}`,
	owner: "Victor Cracco"
});

 const project = response.data;

 setProjects([...projects, project]);

  }
    return (
        <>
    <Header title="Projects"/>
    <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}> Adicionar projeto </button>

    </>   
   );
}
export default App;