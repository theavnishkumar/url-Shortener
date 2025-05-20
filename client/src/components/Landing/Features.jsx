import { BarChart2, LinkIcon, Shield } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our URL Shortener
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-500">
              Create shortened URLs in seconds with our simple and intuitive
              interface. No technical knowledge required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-gray-500">
              Track clicks, geographic data, referrers, and more with our
              comprehensive analytics dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-500">
              Your links are secure and will never expire. We provide 99.9%
              uptime for all your shortened URLs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
