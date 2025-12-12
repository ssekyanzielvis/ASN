import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { workService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const FeaturedWorks = () => {
  const { data: works, isLoading, error } = useQuery({
    queryKey: ['featured-works'],
    queryFn: workService.getFeatured,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load featured works" />;
  if (!works || works.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
              Featured Works
            </h2>
            <p className="text-gray-600 text-lg">
              Highlighting our most impactful projects
            </p>
          </div>
          <Link
            to="/works"
            className="text-black border-b-2 border-black hover:border-gray-600 transition-colors pb-1 hidden md:block"
          >
            View All Works →
          </Link>
        </div>

        {/* Works Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {works.map((work) => (
            <Link
              key={work.id}
              to={`/works/${work.slug}`}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                <img
                  src={work.featured_image}
                  alt={work.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 text-sm font-medium">
                  {work.category_name}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-black mb-3 group-hover:text-gray-700 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {work.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/works"
            className="inline-block text-black border-b-2 border-black hover:border-gray-600 transition-colors pb-1"
          >
            View All Works →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
