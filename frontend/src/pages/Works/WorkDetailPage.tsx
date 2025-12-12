import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { workService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const WorkDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: work, isLoading, error } = useQuery({
    queryKey: ['work', slug],
    queryFn: () => workService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load work details" />;
  if (!work) return <ErrorMessage message="Work not found" />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <img
          src={work.featured_image}
          alt={work.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-12 w-full">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded mb-4">
              <span className="text-white text-sm font-medium">
                {work.category_name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
              {work.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        {/* Description */}
        <div className="max-w-3xl mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            {work.description}
          </p>
        </div>

        {/* Full Content */}
        {work.full_content && (
          <div className="max-w-3xl mb-12">
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
              {work.full_content}
            </div>
          </div>
        )}

        {/* Gallery Images */}
        {work.gallery_images && work.gallery_images.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-black mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.gallery_images.map((image, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`${work.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Works */}
        {work.related_works && work.related_works.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-serif text-black mb-8">
              More from {work.category_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {work.related_works.slice(0, 3).map((relatedWork) => (
                <Link
                  key={relatedWork.id}
                  to={`/works/${relatedWork.slug}`}
                  className="group"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={relatedWork.featured_image}
                      alt={relatedWork.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-black group-hover:text-gray-700 transition-colors">
                    {relatedWork.title}
                  </h3>
                </Link>
              ))}
            </div>
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

export default WorkDetailPage;
