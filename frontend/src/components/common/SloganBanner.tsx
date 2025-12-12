import { useQuery } from '@tanstack/react-query';
import { sloganService } from '../../services/api';

const SloganBanner = () => {
  const { data: slogan } = useQuery({
    queryKey: ['slogan'],
    queryFn: sloganService.get,
  });

  if (!slogan || !slogan.is_active) return null;

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-black">
      <div className="max-w-5xl mx-auto">
        <blockquote className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed text-center italic">
          "{slogan.text}"
        </blockquote>
      </div>
    </section>
  );
};

export default SloganBanner;
