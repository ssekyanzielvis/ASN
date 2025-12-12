import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { teamService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const TeamMemberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: member, isLoading, error } = useQuery({
    queryKey: ['team-member', id],
    queryFn: async () => {
      const members = await teamService.getAll();
      return members.find(m => m.id === Number(id));
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load team member" />;
  if (!member) return <ErrorMessage message="Team member not found" />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
              {member.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {member.role}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/team')}
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-12"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Team
        </button>

        {/* Bio */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-black mb-6">About</h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {member.bio}
          </p>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-serif text-black mb-6">Get in Touch</h2>
          
          <div className="space-y-4">
            {member.email && (
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-400 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-lg text-black hover:text-gray-600 transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            )}

            {(member.linkedin_url || member.website_url) && (
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-400 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Connect</p>
                  <div className="flex gap-4">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {member.website_url && (
                      <a
                        href={member.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetailPage;
