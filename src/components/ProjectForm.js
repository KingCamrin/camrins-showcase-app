import React, { useState, useRef, useCallback } from 'react';

const ProjectForm = ({ onAddProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    status: 'in-progress',
    demoUrl: '',
    githubUrl: '',
    category: 'web-development'
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  }, [error]);

  const validateForm = useCallback(() => {
    const { title, description } = formData;
    if (title.trim().length < 2) {
      return 'Title must be at least 2 characters.';
    }
    if (description.trim().length < 5) {
      return 'Description must be at least 5 characters.';
    }
    return '';
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const processedProject = {
        ...formData,
        id: crypto.randomUUID(),
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await onAddProject(processedProject);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        technologies: '',
        status: 'in-progress',
        demoUrl: '',
        githubUrl: '',
        category: 'web-development'
      });
      setError('');
      
      // Focus back to title for easy next entry
      titleRef.current?.focus();
    } catch (err) {
      setError('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onAddProject]);

  // Keyboard shortcut for power users
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <section className="project-form-section" aria-label="Add new project">
      <h2>
        ➕ Add New Project
      </h2>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="project-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., AI Resume Parser"
              required
              aria-describedby={error ? "form-error" : undefined}
              className={error && formData.title.trim().length < 2 ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-label="Project category"
            >
              <option value="web-development">🌐 Web Development</option>
              <option value="mobile-app">📱 Mobile App</option>
              <option value="desktop-app">💻 Desktop Application</option>
              <option value="data-science">📊 Data Science</option>
              <option value="machine-learning">🤖 Machine Learning</option>
              <option value="game-development">🎮 Game Development</option>
              <option value="api">🔗 API/Backend</option>
              <option value="other">⚡ Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Project Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              aria-label="Project status"
            >
              <option value="planned">📋 Planned</option>
              <option value="in-progress">🚧 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies Used</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB (comma-separated)"
              aria-describedby="tech-help"
            />
            <small id="tech-help" className="form-help">
              Separate multiple technologies with commas
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="demoUrl">Demo/Live URL</label>
            <input
              type="url"
              id="demoUrl"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              placeholder="https://your-project-demo.com"
              aria-label="Demo or live website URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubUrl">GitHub Repository</label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              aria-label="GitHub repository URL"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Impact + tech (e.g., NLP extraction + REST API)"
              required
              rows={4}
              aria-describedby={error ? "form-error" : "desc-help"}
              className={error && formData.description.trim().length < 5 ? 'error' : ''}
            />
            <small id="desc-help" className="form-help">
              Focus on impact and technical details that matter to employers
            </small>
          </div>
        </div>

        {error && (
          <div id="form-error" className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Adding Project...
              </>
            ) : (
              <>✨ Add Project</>
            )}
          </button>
          <small id="submit-help" className="form-help">
            💡 Tip: Use Cmd/Ctrl + Enter to submit quickly
          </small>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;
