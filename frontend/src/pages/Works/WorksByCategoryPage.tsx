import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { workService, workCategoryService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const WorksByCategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const { data: categoryData } = useQuery({
    queryKey: ['work-category', category],
    queryFn: () => workCategoryService.getByName(category!),
    enabled: !!category,
  });

  const { data: works, isLoading, error } = useQuery({
    queryKey: ['works-by-category', category],
    queryFn: () => workService.getByCategory(category!),
    enabled: !!category,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load works" />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {categoryData && (
        <div className="relative h-[40vh] overflow-hidden bg-black">
          <img
            src={categoryData.image}
            alt={categoryData.display_name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-12 w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
                {categoryData.display_name}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Works Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        {works && works.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                {works.length} {works.length === 1 ? 'work' : 'works'} in this category
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work) => (
                <Link
                  key={work.id}
                  to={`/works/${work.slug}`}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={work.featured_image}
                      alt={work.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-serif text-black mb-2 group-hover:text-gray-700 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {work.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No works found in this category yet.</p>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link
            to="/works"
            className="inline-flex items-center text-black hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorksByCategoryPage;
