import { Link } from "react-router";

export const LinkRevoked = ({shortUrl}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-red-200">
      <div className="mb-6">
        
        <svg
          className="w-32 h-20 mx-auto"
          viewBox="0 0 160 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          
          <g transform="translate(80, 40)">
            
            <path
              d="M 0 -25 L 15 -20 L 15 5 Q 15 15 0 20 Q -15 15 -15 5 L -15 -20 Z"
              fill="#fef2f2"
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
            </path>

            
            <g>
              <path
                d="M 0 -8 L 6 6 L -6 6 Z"
                fill="#ef4444"
                className="animate-pulse"
              >
                <animate
                  attributeName="fill-opacity"
                  values="1;0.5;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </path>
              <circle cx="0" cy="2" r="1" fill="#fef2f2" />
              <line
                x1="0"
                y1="-3"
                x2="0"
                y2="0"
                stroke="#fef2f2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            
            <circle
              r="30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="30;35;30"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r="35"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1"
              opacity="0.2"
            >
              <animate
                attributeName="r"
                values="35;40;35"
                dur="2s"
                repeatCount="indefinite"
                begin="0.5s"
              />
              <animate
                attributeName="opacity"
                values="0.2;0;0.2"
                dur="2s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
          </g>

          
          <g opacity="0.6">
            <circle cx="40" cy="25" r="2" fill="#ef4444">
              <animate
                attributeName="cy"
                values="25;15;25"
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
            <circle cx="120" cy="55" r="1.5" fill="#dc2626">
              <animate
                attributeName="cy"
                values="55;65;55"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="50" cy="60" r="1" fill="#f87171">
              <animate
                attributeName="cy"
                values="60;70;60"
                dur="1.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0;0.7"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>

      <Shield className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Link Revoked</h1>
      <p className="text-lg text-gray-600 mb-6">
        The short URL{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-red-600">
          /{shortUrl}
        </span>{" "}
        has been revoked for security reasons.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-left">
            <p className="text-red-800 text-sm font-medium mb-1">
              Why was this link revoked?
            </p>
            <p className="text-red-700 text-sm">
              This link was removed due to privacy violations, security
              concerns, or policy violations. This action helps protect our
              users and maintain a safe browsing environment.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-gray-700 text-sm">
          <strong>Need help?</strong> If you believe this was done in error,
          please{" "}
          <Link
            href="/contact"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            contact our support team
          </Link>{" "}
          with the link details.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          to="/shorten"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Create New Link
        </Link>
      </div>
    </div>
  );
};
