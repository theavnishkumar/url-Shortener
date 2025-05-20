import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl text-gray-500 mb-8">
          Join thousands of users who trust our URL shortener for their link
          management needs.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 text-lg font-medium"
        >
          Shorten Your First URL <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
