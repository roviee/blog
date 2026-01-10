export const HeroSection = () => {
  return (
    <section className="bg-linear-to-b from-amber-50 to-white py-12 sm:py-16 md:py-24 border-b border-amber-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 font-serif mb-4 sm:mb-6 leading-tight">
            Welcome to BlogHub
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-800 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            A simple space to publish your thoughts and reach readers who care.
          </p>
        </div>
      </div>
    </section>
  );
};
