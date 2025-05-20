import React from "react";

const HowWork = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Paste your long URL</h3>
            <p className="text-gray-500">
              Enter your long URL into our shortener input field.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Click "Shorten URL"</h3>
            <p className="text-gray-500">
              Click the button and get your shortened URL instantly.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Share and track</h3>
            <p className="text-gray-500">
              Share your short URL and track its performance with our analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
