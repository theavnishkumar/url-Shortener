import { Link } from "react-router";
import { FileText, Shield, Copyright, Scale } from "lucide-react";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Legal Information
            </h1>
            <p className="text-lg text-gray-600">
              Important legal documents and policies for URL Shortener
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Link to="/legal/terms-of-service" className="group">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                    Terms of Service
                  </h2>
                </div>
                <p className="text-gray-700">
                  Our terms and conditions for using the URL shortener service,
                  including acceptable use policies and user responsibilities.
                </p>
              </div>
            </Link>

            <Link to="/legal/privacy-policy" className="group">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                    Privacy Policy
                  </h2>
                </div>
                <p className="text-gray-700">
                  How we collect, use, and protect your personal information,
                  including data security measures and your privacy rights.
                </p>
              </div>
            </Link>

            <Link to="/legal/dmca" className="group">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    <Copyright className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                    DMCA Policy
                  </h2>
                </div>
                <p className="text-gray-700">
                  Our Digital Millennium Copyright Act compliance policy and
                  procedures for reporting copyright infringement.
                </p>
              </div>
            </Link>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-100 mr-4">
                  <Scale className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  MIT License
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                This project is open source and licensed under the MIT License,
                allowing free use, modification, and distribution.
              </p>
              <a
                href="https://github.com/theavnishkumar/url-Shortener/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View License →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Educational Project Notice
            </h2>
            <p className="text-gray-700 mb-4">
              This URL shortener is created as an educational project to
              demonstrate modern web development practices and serve as a
              learning resource for computer science students. Key points:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Designed for academic and educational purposes</li>
              <li>• Demonstrates MERN stack development practices</li>
              <li>• Showcases security and privacy implementation</li>
              <li>• Serves as a portfolio project for students</li>
              <li>• Open source and freely available for learning</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Compliance & Security
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Data Protection
                </h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• HTTPS encryption for all data transmission</li>
                  <li>• Secure password hashing</li>
                  <li>• HTTP-only cookies for authentication</li>
                  <li>• Regular security updates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Privacy Measures
                </h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Automatic data cleanup with TTL indexes</li>
                  <li>• User control over personal data</li>
                  <li>• Transparent data collection practices</li>
                  <li>• Right to data deletion</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact & Support
            </h2>
            <p className="text-gray-700 mb-4">
              For legal inquiries, privacy concerns, or general questions about
              our policies:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Contact Form:</strong>{" "}
                <Link
                  to="/contact"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Submit an inquiry
                </Link>
              </p>
              <p className="text-gray-700">
                <strong>GitHub Issues:</strong>{" "}
                <a
                  href="https://github.com/theavnishkumar/url-Shortener/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Report issues or ask questions
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Creator:</strong>{" "}
                <a
                  href="https://github.com/theavnishkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Avnish Kumar
                </a>
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Questions About Our Policies?
            </h2>
            <p className="text-gray-700 mb-4">
              We're here to help clarify any questions about our legal policies
              or how we handle your data.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
