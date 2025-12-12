import React from 'react';
import HeroSlider from '../../components/common/HeroSlider';
import FeaturedWorks from '../../components/common/FeaturedWorks';
import SloganBanner from '../../components/common/SloganBanner';
import WorkCategoriesGrid from '../../components/common/WorkCategoriesGrid';
import AboutSection from '../../components/common/AboutSection';
import TeamSection from '../../components/common/TeamSection';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Dynamic Hero Slider */}
      <HeroSlider />

      {/* Featured Works Section */}
      <FeaturedWorks />

      {/* Slogan Banner */}
      <SloganBanner />

      {/* Work Categories Grid */}
      <WorkCategoriesGrid />

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <TeamSection />
    </div>
  );
};

export default HomePage;
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-pure-black">
              Featured Work
            </h2>
            <Link
              to="/projects"
              className="font-body font-medium text-pure-black hover:underline text-lg"
            >
              View All →
            </Link>
          </div>

          {featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-dark-gray-2 text-center py-12">
              No featured projects available yet.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-pure-black text-pure-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Let's Collaborate
          </h2>
          <p className="text-xl text-dark-gray-3 mb-8 max-w-2xl mx-auto">
            Interested in working together on a project? We'd love to hear from you.
          </p>
          <Link to="/collaborate" className="btn-secondary inline-block bg-pure-white text-pure-black">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
