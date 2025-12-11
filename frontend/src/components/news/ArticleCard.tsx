import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { NewsArticle } from '../../types';

interface ArticleCardProps {
  article: NewsArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Link to={`/news/${article.slug}`} className="card group block overflow-hidden">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-10 overflow-hidden bg-off-white">
        {article.featured_image ? (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-56 bg-dark-gray-3 bg-opacity-10 flex items-center justify-center">
            <span className="text-dark-gray-3 font-display text-lg">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date and Author */}
        <div className="flex items-center text-sm text-dark-gray-3 font-body mb-3">
          {article.publish_date && (
            <span>{formatDate(article.publish_date)}</span>
          )}
          {article.author_name && (
            <>
              <span className="mx-2">•</span>
              <span>{article.author_name}</span>
            </>
          )}
        </div>

        <h3 className="text-2xl font-display font-bold text-pure-black mb-3 group-hover:underline">
          {article.title}
        </h3>

        <p className="text-dark-gray-2 font-body line-clamp-3">{article.excerpt}</p>

        <div className="mt-4">
          <span className="text-pure-black font-body font-medium group-hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
