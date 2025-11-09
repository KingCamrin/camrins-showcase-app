import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import ProjectForm from './components/ProjectForm.js';
import ProjectList from './components/ProjectList.jsx';
import Header from './components/Header.jsx';
import Clock from './components/Clock.jsx';

function App() {
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage on app start
  useEffect(() => {
    const loadProjects = () => {
      try {
        const savedProjects = localStorage.getItem('camrins-projects');
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          setProjects(Array.isArray(parsedProjects) ? parsedProjects : []);
        }
      } catch (error) {
        console.error('Error loading projects from localStorage:', error);
        setProjects([]);
      }
    };
    
    loadProjects();
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem('camrins-projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  }, [projects]);

  // Memoized handlers for better performance
  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: Date.now() + Math.random(), // More unique ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
  }, []);

  const editProject = useCallback((id, updatedProject) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id 
          ? { ...project, ...updatedProject, updatedAt: new Date().toISOString() } 
          : project
      )
    );
  }, []);

  // Memoized project statistics
  const projectStats = useMemo(() => {
    const stats = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {});
    return stats;
  }, [projects]);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header projectStats={projectStats} />
      <main className="main-content">
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
          <ProjectForm onAddProject={addProject} />
          <ProjectList 
            projects={projects} 
            onDeleteProject={deleteProject}
            onEditProject={editProject}
          />
        </div>
      </main>
      <Clock />
      
      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>Built with <span className="text-blue-600 font-medium">React</span> & modern web technologies. Make it yours.</p>
      </footer>
    </div>
  );
}

export default App;
