import { XCircle } from "lucide-react";
import { Link } from "react-router";

export const LinkNotFound = ({ shortUrl }) => {
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-8 mb-8 border border-red-100">
        <div className="mb-2">
          <svg
            className="w-32 h-20 mx-auto"
            viewBox="0 0 160 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Broken link animation */}
            <g>
              {/* Left part of broken chain */}
              <circle
                cx="40"
                cy="40"
                r="12"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                className="animate-pulse"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="1;0.3;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="40"
                cy="40"
                r="8"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />

              <path
                d="M 52 40 L 70 40"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5,5"
                className="animate-pulse"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>

              <g transform="translate(80, 40)">
                <circle
                  r="10"
                  fill="#fef2f2"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <path
                  d="M-4,-4 L4,4 M4,-4 L-4,4"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-width"
                    values="2;3;2"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>

              <g transform="translate(120, 40)">
                <circle
                  r="12"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="3"
                  strokeDasharray="75"
                  className="animate-pulse"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;75"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  textAnchor="middle"
                  y="6"
                  className="text-lg font-bold fill-gray-600"
                >
                  ?
                </text>
              </g>

              <circle cx="30" cy="20" r="2" fill="#ef4444" opacity="0.6">
                <animate
                  attributeName="cy"
                  values="20;10;20"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="130" cy="60" r="1.5" fill="#f59e0b" opacity="0.7">
                <animate
                  attributeName="cy"
                  values="60;70;60"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>

        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Link Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The short URL{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-red-600">
            /{shortUrl}
          </span>{" "}
          does not exist.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800 text-sm">
            This link may have been mistyped or never existed. Please check the
            URL and try again.
          </p>
        </div>

        <div className="flex sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};
