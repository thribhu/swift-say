function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 relative bottom-0 w-full">
      <div className="container mx-auto flex flex-wrap items-center justify-center mb-8">
        <div className="w-full text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-sm">
            Empowering learners worldwide through accessible and innovative
            education.
          </p>
        </div>

        <hr className="w-full border-t border-gray-600 mb-4" />
        <div className="w-full flex flex-wrap justify-evenly">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <ul>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Course Catalog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Learn Anywhere
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <ul>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Corporate Training
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <ul>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <ul>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Become an Instructor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Student Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Scholarships
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white block">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center">
        {/* Copyright */}
        <hr className="w-full border-t border-gray-600 mb-4" />
        <p className="text-sm text-gray-500">
          &copy; 2023 Your Learning Platform. All rights reserved.
        </p>

        {/* Privacy, Terms, and Conditions */}
        <div className="mt-4">
          <a href="#" className="text-gray-500 hover:text-white mx-2">
            Privacy
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-gray-500 hover:text-white mx-2">
            Terms of Service
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-gray-500 hover:text-white mx-2">
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
