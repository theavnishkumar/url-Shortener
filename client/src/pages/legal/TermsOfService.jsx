import { Link } from "react-router";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-700">
                By accessing and using URL Shortener ("the Service"), you accept
                and agree to be bound by the terms and provision of this
                agreement. This Service is provided for educational purposes and
                to demonstrate modern web development practices.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Educational Purpose
              </h2>
              <p className="text-gray-700 mb-4">
                This application is created primarily for educational purposes,
                including but not limited to:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Demonstrating MERN stack development practices</li>
                <li>• Teaching web security and privacy implementation</li>
                <li>• Showcasing modern frontend and backend technologies</li>
                <li>
                  • Providing a learning resource for computer science students
                </li>
                <li>
                  • Serving as a portfolio project for academic and professional
                  purposes
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Acceptable Use
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms. You agree NOT to:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Shorten URLs that link to illegal, harmful, or malicious
                  content
                </li>
                <li>
                  • Use the Service to distribute spam, malware, or phishing
                  content
                </li>
                <li>
                  • Attempt to gain unauthorized access to the Service or its
                  systems
                </li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Infringe upon the rights of others</li>
                <li>
                  • Use the Service for commercial purposes without permission
                </li>
                <li>• Attempt to reverse engineer or copy the Service</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                User Accounts
              </h2>
              <p className="text-gray-700 mb-4">
                To use certain features of the Service, you must create an
                account. You agree to:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Provide accurate and complete information</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Notify us immediately of any unauthorized use</li>
                <li>
                  • Accept responsibility for all activities under your account
                </li>
                <li>• Use only one account per person</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Service Availability
              </h2>
              <p className="text-gray-700 mb-4">
                As an educational project, we strive to maintain service
                availability but cannot guarantee:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Continuous, uninterrupted access to the Service</li>
                <li>• Error-free operation of all features</li>
                <li>• Permanent storage of your data</li>
                <li>• Compatibility with all devices and browsers</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We reserve the right to modify, suspend, or discontinue the
                Service at any time for maintenance, updates, or other reasons.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Content and Data
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your Content
              </h3>
              <ul className="text-gray-700 mb-4 space-y-2">
                <li>• You retain ownership of URLs and data you submit</li>
                <li>
                  • You grant us permission to process your data to provide the
                  Service
                </li>
                <li>
                  • You are responsible for the content of URLs you shorten
                </li>
                <li>• We may remove content that violates these Terms</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Data Backup and Recovery
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Deleted URLs are backed up for 6 months before permanent
                  deletion
                </li>
                <li>
                  • You may request data recovery through our contact form
                </li>
                <li>
                  • We implement reasonable backup procedures but cannot
                  guarantee data recovery
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Privacy and Analytics
              </h2>
              <p className="text-gray-700 mb-4">
                The Service collects analytics data to demonstrate functionality
                and provide insights:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Click tracking includes IP addresses, location, and device
                  information
                </li>
                <li>• Login history is maintained for security purposes</li>
                <li>
                  • Data is used for educational demonstration and service
                  improvement
                </li>
                <li>
                  • Personal data is handled according to our Privacy Policy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                This project is open source and licensed under the MIT License:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• The source code is freely available on GitHub</li>
                <li>
                  • You may use, modify, and distribute the code under the MIT
                  License
                </li>
                <li>
                  • Attribution to the original creator (Avnish Kumar) is
                  appreciated
                </li>
                <li>
                  • The Service name and branding remain property of the creator
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Disclaimers
              </h2>
              <p className="text-gray-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" FOR EDUCATIONAL PURPOSES. WE
                DISCLAIM ALL WARRANTIES, INCLUDING:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Fitness for a particular purpose</li>
                <li>• Merchantability</li>
                <li>• Non-infringement</li>
                <li>• Accuracy or reliability of the Service</li>
                <li>• Security of data transmission</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits,
                data, or other intangible losses resulting from your use of the
                Service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Termination
              </h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the
                Service:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• For violation of these Terms</li>
                <li>• For illegal or harmful use of the Service</li>
                <li>• At our discretion for any reason</li>
                <li>• Upon your request to delete your account</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
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
                  <strong>GitHub:</strong>{" "}
                  <a
                    href="https://github.com/theavnishkumar/url-Shortener"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Project Repository
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

            <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Changes to Terms
              </h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of the Service constitutes acceptance of the modified Terms.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
