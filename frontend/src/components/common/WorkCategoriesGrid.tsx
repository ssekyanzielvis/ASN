import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { workCategoryService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const WorkCategoriesGrid = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['work-categories'],
    queryFn: workCategoryService.getAll,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load work categories" />;
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Other Works
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our diverse portfolio across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/works/category/${category.name}`}
              className="group relative aspect-square overflow-hidden bg-black"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.display_name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl md:text-3xl font-serif mb-2 group-hover:translate-y-[-4px] transition-transform">
                  {category.display_name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-2">
                  {category.description}
                </p>
                <div className="text-white/60 text-sm">
                  {category.works_count} {category.works_count === 1 ? 'work' : 'works'}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCategoriesGrid;
