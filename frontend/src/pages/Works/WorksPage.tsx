import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { workService, workCategoryService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['work-categories'],
    queryFn: workCategoryService.getAll,
  });

  const { data: works, isLoading, error } = useQuery({
    queryKey: ['works', selectedCategory],
    queryFn: () => 
      selectedCategory 
        ? workService.getByCategory(selectedCategory)
        : workService.getAll(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load works" />;

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-black mb-4">
            All Works
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our complete portfolio
          </p>
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === null
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.name
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.display_name}
              </button>
            ))}
          </div>
        )}

        {/* Works Grid */}
        {works && works.length > 0 ? (
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
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-sm font-medium">
                    {work.category_name}
                  </div>
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
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No works found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPage;
