import { Link } from "react-router";
import { ExternalLink, Github, Mail } from "lucide-react";
import { AdsComponent } from "../components/AdsComponent";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About URL Shortener
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive URL shortening solution built for educational
              purposes and real-world applications
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-700 mb-4">
                This URL Shortener application is a production-level project
                designed specifically for computer science students in their 3rd
                or 4th year, perfect for minor or major project submissions.
                Built with the modern MERN stack (MongoDB, Express.js, React.js,
                Node.js), it demonstrates industry-standard practices and
                comprehensive feature implementation.
              </p>
              <p className="text-gray-700">
                The project showcases advanced concepts including user
                authentication, data analytics, security implementations, and
                responsive design - making it an excellent learning resource and
                portfolio piece for aspiring developers.
              </p>
            </div>

            <AdsComponent dataAdSlot='1002244889' />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Core Functionality
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Secure URL shortening with unique IDs</li>
                    <li>• QR code generation for each link</li>
                    <li>• Real-time click tracking and analytics</li>
                    <li>• User dashboard with comprehensive stats</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Advanced Features
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• JWT-based authentication system</li>
                    <li>• IP logging and location tracking</li>
                    <li>• Login history with privacy controls</li>
                    <li>• Safe deletion with backup system</li>
                    <li>• Contact form with email integration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Technology Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Frontend
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• React 19 with modern hooks</li>
                    <li>• Vite for fast development</li>
                    <li>• TailwindCSS for styling</li>
                    <li>• React Query for state management</li>
                    <li>• React Router v7 for navigation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Backend
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Node.js with Express 5</li>
                    <li>• MongoDB for data storage</li>
                    <li>• JWT for secure authentication</li>
                    <li>• HTTP-only cookies for security</li>
                    <li>• TTL indexes for data cleanup</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Educational Value
              </h2>
              <p className="text-gray-700 mb-4">
                This project serves as an excellent learning resource for
                students, covering essential concepts in modern web development:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Full-Stack Development:</strong> Complete MERN stack
                  implementation
                </li>
                <li>
                  • <strong>Security Best Practices:</strong> JWT
                  authentication, secure cookies, input validation
                </li>
                <li>
                  • <strong>Database Design:</strong> MongoDB schema design with
                  relationships and indexing
                </li>
                <li>
                  • <strong>API Development:</strong> RESTful API design and
                  implementation
                </li>
                <li>
                  • <strong>Frontend Architecture:</strong> Component-based
                  design with modern React patterns
                </li>
                <li>
                  • <strong>Data Analytics:</strong> Click tracking, user
                  analytics, and data visualization
                </li>
                <li>
                  • <strong>DevOps Concepts:</strong> Environment configuration,
                  deployment strategies
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Project Creator
              </h2>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Avnish Kumar
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A passionate developer and educator who created this project
                    to help fellow students learn modern web development through
                    hands-on experience. The project demonstrates
                    industry-standard practices and serves as a comprehensive
                    learning resource.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/theavnishkumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      GitHub Profile
                    </a>
                    <a
                      href="https://github.com/theavnishkumar/url-Shortener"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Project Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Open Source & Contributions
              </h2>
              <p className="text-gray-700 mb-4">
                This project is open source and welcomes contributions from the
                developer community. Whether you're a student looking to learn
                or an experienced developer wanting to contribute, there are
                many ways to get involved:
              </p>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Report bugs and suggest improvements</li>
                <li>• Submit pull requests for new features</li>
                <li>• Improve documentation and tutorials</li>
                <li>• Share your experience using the project</li>
              </ul>
              <p className="text-gray-700">
                The project is licensed under the MIT License, making it free to
                use, modify, and distribute for educational and commercial
                purposes.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-700 mb-6">
                Have questions about the project? Need help with implementation?
                Want to share your experience? We'd love to hear from you!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
