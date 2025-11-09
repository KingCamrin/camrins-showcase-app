import React, { useMemo, useState } from 'react';
import ProjectCard from './ModernProjectCard.jsx';
import SearchBar from './SearchBar.jsx';
import { Section } from './UI.jsx';

const ProjectList = ({ projects, onDeleteProject, onEditProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase().trim();
    return projects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.technologies || []).some(tech => 
        tech.toLowerCase().includes(query)
      )
    );
  }, [projects, searchQuery]);

  // Group filtered projects by status
  const groupedProjects = useMemo(() => {
    return filteredProjects.reduce((acc, project) => {
      if (!acc[project.status]) {
        acc[project.status] = [];
      }
      acc[project.status].push(project);
      return acc;
    }, {});
  }, [filteredProjects]);

  // Status order and labels
  const statusOrder = ['completed', 'in-progress', 'planned'];
  const statusLabels = {
    'completed': '✅ Completed Projects',
    'in-progress': '🚧 In Progress',
    'planned': '📋 Planned Projects'
  };

  const EmptyState = ({ hasSearch = false }) => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4 opacity-30">
        {hasSearch ? '�' : '📁'}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasSearch ? 'No projects found' : 'No projects yet'}
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        {hasSearch 
          ? 'Try adjusting your search terms or add a new project above.'
          : 'Start building your professional portfolio by adding your first project above. Showcase your skills and impress potential employers!'
        }
      </p>
    </div>
  );

  return (
    <Section 
      title={`🚀 My Projects (${projects.length})`}
      subtitle={searchQuery ? `Found ${filteredProjects.length} matching projects` : 'Showcase your work and impress employers'}
    >
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, description, or technology..."
        />
      </div>

      {/* Projects */}
      {filteredProjects.length === 0 ? (
        <EmptyState hasSearch={!!searchQuery} />
      ) : (
        <div className="space-y-8">
          {statusOrder.map(status => {
            const statusProjects = groupedProjects[status];
            if (!statusProjects || statusProjects.length === 0) return null;

            return (
              <div key={status}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {statusLabels[status]} ({statusProjects.length})
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {statusProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={onDeleteProject}
                      onEdit={onEditProject}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};

export default ProjectList;
