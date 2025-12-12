import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { heroSlideService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: slides, isLoading, error } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: heroSlideService.getAll,
    retry: 1, // Retry once on failure
  });

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error('[HeroSlider] Error loading slides:', error);
    return <ErrorMessage message="Failed to load hero slides" error={error} />;
  }
  if (!slides || slides.length === 0) {
    // Show placeholder when no slides
    return (
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Atelier Spaces Nate</h1>
          <p className="text-xl text-gray-300">Architecture • Design • Innovation</p>
        </div>
      </div>
    );
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.caption}
            className="w-full h-full object-cover"
          />
          
          {/* Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 md:p-12">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-light max-w-4xl">
              {slide.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrow Navigation */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
