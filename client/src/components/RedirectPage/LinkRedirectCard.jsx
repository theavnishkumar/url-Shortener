export const LinkRedirectCard = ({ countdown }) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-8 mb-4 border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Please wait a moment...
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We're getting you to your destination safely
      </p>

      <div className="mb-6">
        <svg
          className="w-32 h-20 mx-auto"
          viewBox="0 0 160 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="40"
            r="8"
            fill="#4f46e5"
            className="animate-pulse"
          >
            <animate
              attributeName="r"
              values="8;10;8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="20"
            y="60"
            textAnchor="middle"
            className="text-xs fill-gray-600 font-medium"
          >
            You
          </text>

          <path
            d="M 35 40 Q 80 20 125 40"
            stroke="#4f46e5"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="90"
            strokeDashoffset="90"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="90;0;90"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          <circle r="4" fill="#ec4899">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#path" />
            </animateMotion>
          </circle>

          <path id="path" d="M 35 40 Q 80 20 125 40" fill="none" opacity="0" />

          <circle
            cx="140"
            cy="40"
            r="8"
            fill="#10b981"
            className="animate-pulse"
          >
            <animate
              attributeName="r"
              values="8;10;8"
              dur="2s"
              repeatCount="indefinite"
              begin="1s"
            />
          </circle>
          <text
            x="140"
            y="60"
            textAnchor="middle"
            className="text-xs fill-gray-600 font-medium"
          >
            Destination
          </text>

          <polygon
            points="125,35 135,40 125,45"
            fill="#4f46e5"
            className="animate-pulse"
            style={{ transformOrigin: "130px 40px" }}
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.2;1"
              dur="3s"
              repeatCount="indefinite"
            />
          </polygon>

          <circle cx="60" cy="25" r="1.5" fill="#7c3aed" opacity="0.6">
            <animate
              attributeName="cy"
              values="25;15;25"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="55" r="1.5" fill="#06b6d4" opacity="0.6">
            <animate
              attributeName="cy"
              values="55;65;55"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="30" r="1" fill="#f59e0b" opacity="0.7">
            <animate
              attributeName="cy"
              values="30;20;30"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
          Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};
