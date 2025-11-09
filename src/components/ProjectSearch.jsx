import React, { useState, useCallback, useMemo } from 'react';

const ProjectSearch = ({ onSearch, onFilter, projects = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Get unique categories and statuses from projects
  const filterOptions = useMemo(() => {
    const categories = [...new Set(projects.map(p => p.category))];
    const statuses = [...new Set(projects.map(p => p.status))];
    return { categories, statuses };
  }, [projects]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, { status: statusFilter, category: categoryFilter });
  }, [statusFilter, categoryFilter, onSearch]);

  const handleStatusFilter = useCallback((e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilter({ status: value, category: categoryFilter });
  }, [categoryFilter, onFilter]);

  const handleCategoryFilter = useCallback((e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    onFilter({ status: statusFilter, category: value });
  }, [statusFilter, onFilter]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    onSearch('', {});
  }, [onSearch]);

  const hasActiveFilters = searchTerm || statusFilter || categoryFilter;

  return (
    <div className="project-search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="clear-filters-btn"
            title="Clear all filters"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="filter-controls">
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          {filterOptions.statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {filterOptions.categories.map(category => (
            <option key={category} value={category}>
              {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProjectSearch;
