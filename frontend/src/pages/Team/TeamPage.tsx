import { useQuery } from '@tanstack/react-query';
import { teamService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const TeamPage = () => {
  const { data: members, isLoading, error } = useQuery({
    queryKey: ['team-members'],
    queryFn: teamService.getAll,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load team members" />;

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-black mb-4">
            Our Team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Meet the talented individuals who bring creativity, expertise, and passion to every project.
          </p>
        </div>

        {/* Team Grid */}
        {members && members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {members.map((member) => (
              <div key={member.id} className="group">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-2xl font-serif text-black mb-2">
                    {member.name}
                  </h2>
                  <p className="text-gray-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Contact & Social */}
                  <div className="space-y-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="block text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        {member.email}
                      </a>
                    )}
                    <div className="flex gap-3 pt-2">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {member.website_url && (
                        <a
                          href={member.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                          aria-label={`${member.name}'s Website`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No team members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
