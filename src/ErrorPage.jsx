import React from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Home, Code } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container max-w-lg mx-auto px-4 py-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-[120px] font-bold text-gray-100">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you are looking for doesn't exist or has been moved to
            another URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-indigo-900 text-white hover:bg-indigo-800 transition-colors"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
