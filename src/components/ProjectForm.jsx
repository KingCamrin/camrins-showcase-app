import React, { useState, useCallback, useMemo } from 'react';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
      newErrors.demoUrl = 'Please enter a valid URL';
    }
    
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    return newErrors;
  }, [formData]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const processedProject = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
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
      setErrors({});
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onAddProject]);

  // Character count for description
  const descriptionCharCount = useMemo(() => {
    return formData.description.length;
  }, [formData.description]);

  const maxDescriptionLength = 500;

  return (
    <section className="project-form-section">
      <h2>
        ➕ Add New Project
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project name"
              className={errors.title ? 'error' : ''}
              required
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App</option>
              <option value="desktop-app">Desktop Application</option>
              <option value="data-science">Data Science</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="game-development">Game Development</option>
              <option value="api">API/Backend</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Project Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
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
            />
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
              className={errors.demoUrl ? 'error' : ''}
            />
            {errors.demoUrl && <span className="error-message">{errors.demoUrl}</span>}
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
              className={errors.githubUrl ? 'error' : ''}
            />
            {errors.githubUrl && <span className="error-message">{errors.githubUrl}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project, its features, and what makes it special..."
              maxLength={maxDescriptionLength}
              required
              className={errors.description ? 'error' : ''}
            />
            <div className="form-footer">
              <span className={`char-count ${descriptionCharCount > maxDescriptionLength * 0.9 ? 'warning' : ''}`}>
                {descriptionCharCount}/{maxDescriptionLength}
              </span>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Adding Project...
            </>
          ) : (
            <>
              ✨ Add Project
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default ProjectForm;
