import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing projects with localStorage persistence
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load projects from localStorage on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const savedProjects = localStorage.getItem('camrins-projects');
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          setProjects(Array.isArray(parsedProjects) ? parsedProjects : []);
        }
      } catch (err) {
        setError('Failed to load projects from storage');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('camrins-projects', JSON.stringify(projects));
      } catch (err) {
        setError('Failed to save projects to storage');
        console.error('Error saving projects:', err);
      }
    }
  }, [projects, loading]);

  // Add a new project
  const addProject = useCallback((projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setProjects(prevProjects => [newProject, ...prevProjects]);
    return newProject;
  }, []);

  // Update an existing project
  const updateProject = useCallback((id, updatedData) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? { ...project, ...updatedData, updatedAt: new Date().toISOString() }
          : project
      )
    );
  }, []);

  // Delete a project
  const deleteProject = useCallback((id) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
  }, []);

  // Get project statistics
  const getProjectStats = useCallback(() => {
    const stats = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {});
    return stats;
  }, [projects]);

  // Search and filter projects
  const searchProjects = useCallback((searchTerm, filters = {}) => {
    return projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus = !filters.status || project.status === filters.status;
      const matchesCategory = !filters.category || project.category === filters.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects]);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    getProjectStats,
    searchProjects
  };
};
