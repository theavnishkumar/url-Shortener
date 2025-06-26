import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Github, Linkedin, Globe, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { redirectUrl } from "../api/url";
import { AdsComponent } from "../components/AdsComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function RedirectPage() {
  const { shortId } = useParams();
  const [countdown, setCountdown] = useState(10);


  const { data, isLoading } = useQuery({
    queryKey: ["redirect", shortId],
    queryFn: () => redirectUrl(shortId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.redirectUrl) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [data]);

  if(isLoading) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Redirect Animation */}
        <div className="bg-white rounded-md shadow-md p-8 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please wait a moment...
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We're getting you to your destination safely
          </p>

          {/* Redirect Animation */}
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

              <path
                id="path"
                d="M 35 40 Q 80 20 125 40"
                fill="none"
                opacity="0"
              />

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

              {/* Arrow head */}
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

          {/* Countdown */}
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <AdsComponent dataAdSlot="6040347430" />

        {/* My Promotion */}
        <div className="bg-white rounded-md shadow-md p-8 border border-gray-100">
          <div className="flex items-center justify-center mb-4">
            <Code className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Need a Full Stack Developer?
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Hi! I'm{" "}
            <span className="font-semibold text-indigo-600">Avnish Kumar</span>,
            a passionate full-stack developer specializing in modern web
            technologies. I built this URL shortener to showcase my skills in
            the MERN stack.
          </p>

          {/* Tech Quote */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border-l-4 border-indigo-500">
            <p className="text-gray-700 italic text-center">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              - Cory House
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Specialized in:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "React.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "TypeScript",
                "Next.js",
                "TailwindCSS",
                "JWT Auth",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://linkedin.com/in/theavnishkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>

            <a
              href="https://github.com/theavnishkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>

            <a
              href="https://theavnishkumar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Globe className="h-4 w-4 mr-2" />
              Portfolio
            </a>
          </div>

          {/* Contact CTA */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-center">
            <p className="text-sm mb-2">
              Looking for a dedicated developer for your next project?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Let's Connect
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Made by{" "}
            <a
              href="https://theavnishkumar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Avnish Kumar
            </a>{" "}
            • Built with ❤️ for learning
          </p>
        </div>
      </div>
    </div>
  );
}
