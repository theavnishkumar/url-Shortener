import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shorten, Share, Track
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Create short links in seconds. Share them anywhere. Track their
            performance with detailed analytics.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 text-lg font-medium"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
