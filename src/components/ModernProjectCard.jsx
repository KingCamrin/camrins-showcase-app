import React, { useState } from 'react';
import { Button, Badge } from './UI.jsx';
import Modal from './Modal.jsx';

export default function ProjectCard({ project, onDelete, onEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', { 
      dateStyle: 'medium' 
    }).format(new Date(timestamp));
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

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'green',
      'in-progress': 'yellow',
      'planned': 'blue'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'completed': '✅ Completed',
      'in-progress': '🚧 In Progress',
      'planned': '📋 Planned'
    };
    return labels[status] || status;
  };

  const handleDelete = () => {
    onDelete(project.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <article className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <span className="text-xl" role="img" aria-label="Project category">
                  {getCategoryIcon(project.category)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatDate(project.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(project.id)}
                aria-label={`Edit ${project.title}`}
              >
                ✏️
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                aria-label={`Delete ${project.title}`}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                🗑️
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="blue" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3">
            {project.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>🌐</span>
                Live Demo
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>📚</span>
                Source Code
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </article>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Are you sure you want to delete <strong>"{project.title}"</strong>? 
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
