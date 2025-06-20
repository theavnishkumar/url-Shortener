import { Link } from "react-router";

export default function DMCA() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              DMCA Policy
            </h1>
            <p className="text-lg text-gray-600">
              Digital Millennium Copyright Act Compliance
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700">
                URL Shortener respects the intellectual property rights of
                others and expects our users to do the same. In accordance with
                the Digital Millennium Copyright Act (DMCA), we will respond to
                clear notices of alleged copyright infringement that comply with
                the DMCA and other applicable laws.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Educational Context
              </h2>
              <p className="text-gray-700">
                This URL shortener is created for educational purposes to
                demonstrate web development practices and serve as a learning
                resource for computer science students. While we take copyright
                seriously, this service is not intended for commercial use and
                serves primarily as an educational tool.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Reporting Copyright Infringement
              </h2>
              <p className="text-gray-700 mb-4">
                If you believe that content accessible through our service
                infringes your copyright, please provide us with the following
                information:
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Required Information
              </h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>
                  • A physical or electronic signature of the copyright owner or
                  authorized agent
                </li>
                <li>
                  • Identification of the copyrighted work claimed to have been
                  infringed
                </li>
                <li>
                  • The shortened URL or link that allegedly contains infringing
                  material
                </li>
                <li>
                  • Your contact information (address, phone number, email)
                </li>
                <li>
                  • A statement that you have a good faith belief that the use
                  is not authorized
                </li>
                <li>
                  • A statement that the information is accurate and you are
                  authorized to act
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How to Submit
              </h3>
              <p className="text-gray-700">
                Please submit DMCA notices through our{" "}
                <Link
                  to="/contact"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  contact form{" "}
                </Link>
                with "DMCA Notice" in the subject line.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Response Process
              </h2>
              <p className="text-gray-700 mb-4">
                Upon receiving a valid DMCA notice, we will:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Review the notice for completeness and validity</li>
                <li>
                  • Remove or disable access to the allegedly infringing content
                </li>
                <li>
                  • Notify the user who posted the content (if applicable)
                </li>
                <li>• Document the takedown for our records</li>
                <li>
                  • Respond to the complainant confirming the action taken
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Counter-Notification
              </h2>
              <p className="text-gray-700 mb-4">
                If you believe your content was removed in error, you may submit
                a counter-notification containing:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Your physical or electronic signature</li>
                <li>
                  • Identification of the removed content and its location
                </li>
                <li>
                  • A statement under penalty of perjury that the removal was a
                  mistake
                </li>
                <li>• Your contact information</li>
                <li>• Consent to jurisdiction of federal court</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Repeat Infringers
              </h2>
              <p className="text-gray-700">
                We reserve the right to terminate accounts of users who are
                repeat infringers of copyright. However, given the educational
                nature of this project, we will work with users to understand
                and resolve copyright issues when possible.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Limitations
              </h2>
              <p className="text-gray-700 mb-4">
                Please note the following limitations of our service:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • We are a URL shortening service and do not host the actual
                  content
                </li>
                <li>• We cannot control the content of external websites</li>
                <li>
                  • Shortened URLs may redirect to content we do not own or
                  control
                </li>
                <li>
                  • We act as an intermediary service for educational purposes
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Good Faith Use
              </h2>
              <p className="text-gray-700">We encourage users to:</p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Only shorten URLs to content they own or have permission to
                  share
                </li>
                <li>• Respect intellectual property rights</li>
                <li>
                  • Use the service for educational and legitimate purposes
                </li>
                <li>• Report any suspected copyright infringement</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For DMCA-related inquiries, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>DMCA Agent:</strong> Avnish Kumar
                </p>
                <p className="text-gray-700">
                  <strong>Contact:</strong>{" "}
                  <Link
                    to="/contact"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Submit DMCA Notice
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
                  <strong>Subject Line:</strong> "DMCA Notice - [Brief
                  Description]"
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Important Notice
              </h2>
              <p className="text-gray-700">
                False claims of copyright infringement may result in liability
                for damages, including costs and attorney fees. Please ensure
                your DMCA notice is accurate and made in good faith.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
