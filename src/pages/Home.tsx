import { HeroSection } from "@/components/HeroSection";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { Footer } from "@/components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Featured Posts Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 font-serif mb-3 sm:mb-4">
              Featured Posts
            </h3>
            <div className="w-12 sm:w-16 h-1 bg-amber-800 rounded-full"></div>
          </div>
          {/* Grid Layout */}
          <FeaturedPosts />
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};
