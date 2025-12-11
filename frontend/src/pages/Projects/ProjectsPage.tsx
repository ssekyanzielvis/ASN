import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectService, categoryService } from '../../services/api';
import ProjectCard from '../../components/projects/ProjectCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const ProjectsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getAll(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load projects" />;

  const projectTypes = [
    { value: 'all', label: 'All Projects' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'design', label: 'Design' },
    { value: 'game', label: 'Game Systems' },
    { value: 'art', label: 'Art' },
    { value: 'speculative', label: 'Speculative' },
  ];

  const filteredProjects = projects?.filter((project) => {
    const matchesType = selectedType === 'all' || project.project_type === selectedType;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-4">
            Projects
          </h1>
          <p className="text-xl text-dark-gray-2 max-w-3xl">
            Explore our portfolio of work spanning architecture, design, game systems, and speculative projects.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-6 py-2 font-body font-medium transition-all duration-300 ${
                  selectedType === type.value
                    ? 'bg-pure-black text-pure-white'
                    : 'bg-off-white text-dark-gray-2 hover:bg-dark-gray-3 hover:bg-opacity-10'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-gray-2 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
