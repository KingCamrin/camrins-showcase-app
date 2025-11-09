import React from 'react';

const Header = ({ projectStats = {} }) => {
  return (
    <header className="header sticky top-0 z-10 backdrop-blur-sm">
      <div className="container">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            <span className="text-white">Camrin's</span> Portfolio
          </h1>
          <p className="text-sm md:text-base opacity-90 mb-4">
            Aspiring Software Engineer | Ready to Learn & Grow
          </p>
        </div>
        
        {projectStats.total > 0 && (
          <div className="project-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="stat-item text-center">
              <div className="stat-number text-3xl font-bold mb-1">{projectStats.total || 0}</div>
              <div className="stat-label text-sm opacity-90">Total Projects</div>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-3xl font-bold mb-1">{projectStats.completed || 0}</div>
              <div className="stat-label text-sm opacity-90">Completed</div>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-3xl font-bold mb-1">{projectStats['in-progress'] || 0}</div>
              <div className="stat-label text-sm opacity-90">In Progress</div>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-3xl font-bold mb-1">{projectStats.planned || 0}</div>
              <div className="stat-label text-sm opacity-90">Planned</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
