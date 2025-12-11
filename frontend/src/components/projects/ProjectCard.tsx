import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const projectTypeLabels: { [key: string]: string } = {
    architecture: 'Architecture',
    design: 'Design',
    game: 'Game Systems',
    art: 'Art',
    speculative: 'Speculative',
  };

  return (
    <Link to={`/projects/${project.slug}`} className="card group block overflow-hidden">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-12 overflow-hidden bg-off-white">
        {project.featured_image ? (
          <img
            src={project.featured_image}
            alt={project.title}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-64 bg-dark-gray-3 bg-opacity-10 flex items-center justify-center">
            <span className="text-dark-gray-3 font-display text-lg">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-dark-gray-3 uppercase tracking-wider">
            {projectTypeLabels[project.project_type]}
          </span>
          {project.featured && (
            <span className="text-xs font-body font-bold text-pure-black px-2 py-1 border border-pure-black">
              FEATURED
            </span>
          )}
        </div>

        <h3 className="text-2xl font-display font-bold text-pure-black mb-3 group-hover:underline">
          {project.title}
        </h3>

        <p className="text-dark-gray-2 font-body line-clamp-3">{project.description}</p>

        {project.category_name && (
          <div className="mt-4 pt-4 border-t border-dark-gray-3 border-opacity-20">
            <span className="text-sm text-dark-gray-3">{project.category_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
