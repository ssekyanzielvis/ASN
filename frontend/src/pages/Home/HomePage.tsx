import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectService, settingsService } from '../../services/api';
import ProjectCard from '../../components/projects/ProjectCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const HomePage: React.FC = () => {
  const { data: featuredProjects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: () => projectService.getFeatured(),
  });

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsService.get(),
  });

  if (projectsLoading || settingsLoading) return <LoadingSpinner />;
  if (projectsError) return <ErrorMessage message="Failed to load content" />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-pure-black text-pure-white py-24 md:py-32">
        <div className="container-custom">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            {settings?.site_title || 'Atelier Spaces Nate'}
          </h1>
          <p className="text-xl md:text-2xl text-dark-gray-3 max-w-3xl">
            {settings?.tagline || 'A research-led design studio working with form, systems, and cultural intelligence'}
          </p>
        </div>
      </section>

      {/* Founder Quote Section */}
      {settings?.founder_quote && (
        <section className="py-16 md:py-24 bg-off-white">
          <div className="container-custom">
            <blockquote className="text-3xl md:text-4xl font-display italic text-pure-black text-center max-w-4xl mx-auto">
              "{settings.founder_quote}"
            </blockquote>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-pure-black">
              Featured Work
            </h2>
            <Link
              to="/projects"
              className="font-body font-medium text-pure-black hover:underline text-lg"
            >
              View All →
            </Link>
          </div>

          {featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-dark-gray-2 text-center py-12">
              No featured projects available yet.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-pure-black text-pure-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Let's Collaborate
          </h2>
          <p className="text-xl text-dark-gray-3 mb-8 max-w-2xl mx-auto">
            Interested in working together on a project? We'd love to hear from you.
          </p>
          <Link to="/collaborate" className="btn-secondary inline-block bg-pure-white text-pure-black">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
