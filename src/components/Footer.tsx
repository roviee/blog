export const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h4 className="font-bold text-lg mb-3 sm:mb-4">BlogHub</h4>
          </div>
          <div>
            <h5 className="font-bold mb-3 sm:mb-4 text-sm">Categories</h5>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Travel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Food
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-3 sm:mb-4 text-sm">Resources</h5>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-3 sm:mb-4 text-sm">Follow</h5>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>
                <a href="#" className="hover:text-amber-50 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jan-robie-laguda-2b21a4198/"
                  target="_blank"
                  className="hover:text-amber-50 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/roviee"
                  target="_blank"
                  className="hover:text-amber-50 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-800 pt-6 sm:pt-8 text-center text-sm text-amber-200">
          <p>&copy; 2026 BlogHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
