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
