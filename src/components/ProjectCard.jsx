import React, { useState, useCallback, useMemo } from 'react';
import { Button, Badge } from './UI.jsx';
import Modal from './Modal.jsx';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    technologies: project.technologies.join(', '),
    status: project.status,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    category: project.category
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...editData,
      technologies: editData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };
    onEdit(project.id, updatedProject);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      status: project.status,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      category: project.category
    });
    setIsEditing(false);
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = 'status-badge';
    switch (status) {
      case 'completed':
        return `${baseClass} status-completed`;
      case 'in-progress':
        return `${baseClass} status-in-progress`;
      case 'planned':
        return `${baseClass} status-planned`;
      default:
        return baseClass;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'web-development': '🌐',
      'mobile-app': '📱',
      'desktop-app': '💻',
      'data-science': '📊',
      'machine-learning': '🤖',
      'game-development': '🎮',
      'api': '🔗',
      'other': '⚡'
    };
    return icons[category] || '⚡';
  };

  if (isEditing) {
    return (
      <div className="project-card">
        <form onSubmit={handleEditSubmit}>
          <div className="project-card-header">
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                className="form-control"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                name="technologies"
                value={editData.technologies}
                onChange={handleEditChange}
                placeholder="Technologies (comma-separated)"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          
          <div className="project-card-body">
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                rows="3"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px',
                  resize: 'vertical'
                }}
                required
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <select
                name="status"
                value={editData.status}
                onChange={handleEditChange}
                style={{ 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px'
                }}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              
              <select
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                style={{ 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px'
                }}
              >
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="desktop-app">Desktop App</option>
                <option value="data-science">Data Science</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="game-development">Game Development</option>
                <option value="api">API/Backend</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="url"
                name="demoUrl"
                value={editData.demoUrl}
                onChange={handleEditChange}
                placeholder="Demo URL"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}
              />
              <input
                type="url"
                name="githubUrl"
                value={editData.githubUrl}
                onChange={handleEditChange}
                placeholder="GitHub URL"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          
          <div className="project-card-footer">
            <div className="project-actions">
              <button type="submit" className="btn btn-primary btn-sm">
                💾 Save
              </button>
              <button type="button" onClick={handleCancelEdit} className="btn btn-secondary btn-sm">
                ❌ Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 className="project-card-title">
            {getCategoryIcon(project.category)} {project.title}
          </h3>
          <span className={getStatusBadgeClass(project.status)}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="project-card-body">
        <p className="project-card-description">
          {project.description}
        </p>
        {project.createdAt && (
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginTop: '1rem',
            fontStyle: 'italic'
          }}>
            Added on {formatDate(project.createdAt)}
          </p>
        )}
      </div>

      <div className="project-card-footer">
        <div className="project-links">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              🌐 Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              📚 Code
            </a>
          )}
        </div>
        
        <div className="project-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary btn-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this project?')) {
                onDelete(project.id);
              }
            }}
            className="btn btn-danger btn-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
