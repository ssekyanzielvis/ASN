import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../../services/api';
import ArticleCard from '../../components/news/ArticleCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const NewsPage: React.FC = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: () => newsService.getAll(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load news articles" />;

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-4">
            News & Insights
          </h1>
          <p className="text-xl text-dark-gray-2 max-w-3xl">
            Updates, insights, and stories from our studio.
          </p>
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-gray-2 text-lg">No articles available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
