import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { aboutService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const AboutSection = () => {
  const { data: about, isLoading, error } = useQuery({
    queryKey: ['about'],
    queryFn: aboutService.get,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load about section" />;
  if (!about) return null;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
              {about.title}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {about.content}
            </div>
          </div>

          {/* Team Image */}
          {about.team_image && (
            <div className="order-first lg:order-last">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={about.team_image}
                  alt={about.team_caption || 'Our Team'}
                  className="w-full h-full object-cover"
                />
              </div>
              {about.team_caption && (
                <div className="mt-4">
                  <p className="text-gray-600 text-sm italic">
                    {about.team_caption}
                  </p>
                  <Link
                    to="/team"
                    className="inline-block mt-3 text-black border-b-2 border-black hover:border-gray-600 transition-colors pb-1 text-sm font-medium"
                  >
                    View All Team Members →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
