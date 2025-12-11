import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load project" />;
  if (!project) return <ErrorMessage message="Project not found" />;

  const projectTypeLabels: { [key: string]: string } = {
    architecture: 'Architecture',
    design: 'Design',
    game: 'Game Systems',
    art: 'Art',
    speculative: 'Speculative',
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/projects" className="text-dark-gray-2 hover:text-pure-black font-body">
            ← Back to Projects
          </Link>
        </div>

        {/* Hero Image */}
        {project.featured_image && (
          <div className="mb-12">
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-[60vh] object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-body text-dark-gray-3 uppercase tracking-wider">
              {projectTypeLabels[project.project_type]}
            </span>
            {project.category && (
              <>
                <span className="text-dark-gray-3">•</span>
                <span className="text-sm font-body text-dark-gray-3">
                  {project.category.name}
                </span>
              </>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-dark-gray-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Full Content */}
        {project.full_content && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="prose prose-lg max-w-none">
              <div
                className="text-dark-gray-2 font-body leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: project.full_content }}
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-pure-black mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery_images.map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {project.video_url && (
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-pure-black mb-8">Video</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={project.video_url}
                title={`${project.title} video`}
                className="w-full h-96"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center py-12 border-t border-dark-gray-3 border-opacity-20">
          <h3 className="text-2xl font-display font-bold text-pure-black mb-4">
            Interested in Similar Work?
          </h3>
          <Link to="/collaborate" className="btn-primary inline-block">
            Let's Collaborate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
