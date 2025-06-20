import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} URL Shortener. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/about"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              About
            </Link>
            <Link
              to="/legal"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Legal
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
