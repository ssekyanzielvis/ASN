import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { newsService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['news', slug],
    queryFn: () => newsService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load article" />;
  if (!article) return <ErrorMessage message="Article not found" />;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/news" className="text-dark-gray-2 hover:text-pure-black font-body">
            ← Back to News
          </Link>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {article.featured_image && (
            <div className="mb-12">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-[60vh] object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex items-center text-sm text-dark-gray-3 font-body mb-6">
              {article.publish_date && (
                <span>{formatDate(article.publish_date)}</span>
              )}
              {article.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>{article.author}</span>
                </>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-dark-gray-2 leading-relaxed font-body">
              {article.excerpt}
            </p>
          </header>

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <div
                className="text-dark-gray-2 font-body leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          )}

          {/* Share/Footer */}
          <div className="border-t border-dark-gray-3 border-opacity-20 pt-8">
            <Link
              to="/news"
              className="text-pure-black font-body font-medium hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
