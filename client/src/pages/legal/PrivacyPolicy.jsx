import {Link} from "react-router"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700">
                This Privacy Policy describes how URL Shortener ("we", "our", or "us") collects, uses, and protects your
                information when you use our service. This project is created for educational purposes and demonstrates
                best practices in data privacy and security.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Information</h3>
              <ul className="text-gray-700 mb-4 space-y-1">
                <li>• Email address (for account creation and authentication)</li>
                <li>• Username and profile information</li>
                <li>• Password (encrypted and securely stored)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Data</h3>
              <ul className="text-gray-700 mb-4 space-y-1">
                <li>• URLs you shorten and their analytics</li>
                <li>• Click data including IP addresses, device information, and location</li>
                <li>• Browser type and operating system</li>
                <li>• Login history and session information</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">Technical Data</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• IP addresses for security and analytics</li>
                <li>• Device identifiers and browser information</li>
                <li>• Geographic location (country, state, city)</li>
                <li>• ISP information</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Service Provision:</strong> To provide URL shortening and analytics services
                </li>
                <li>
                  • <strong>Security:</strong> To protect against fraud, abuse, and unauthorized access
                </li>
                <li>
                  • <strong>Analytics:</strong> To provide click tracking and usage statistics
                </li>
                <li>
                  • <strong>Communication:</strong> To respond to your inquiries and provide support
                </li>
                <li>
                  • <strong>Improvement:</strong> To enhance and optimize our services
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Encryption:</strong> All passwords are hashed using secure algorithms
                </li>
                <li>
                  • <strong>HTTPS:</strong> All data transmission is encrypted using SSL/TLS
                </li>
                <li>
                  • <strong>Secure Cookies:</strong> Authentication tokens are stored in HTTP-only cookies
                </li>
                <li>
                  • <strong>Access Control:</strong> Strict access controls and authentication requirements
                </li>
                <li>
                  • <strong>Data Backup:</strong> Safe deletion with 6-month backup retention
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Account Data:</strong> Retained while your account is active
                </li>
                <li>
                  • <strong>Login History:</strong> Automatically deleted after 6 months using MongoDB TTL
                </li>
                <li>
                  • <strong>Deleted URLs:</strong> Backed up for 6 months before permanent deletion
                </li>
                <li>
                  • <strong>Analytics Data:</strong> Retained for service improvement and user insights
                </li>
              </ul>
            </div>

            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal data:</p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Access:</strong> Request access to your personal data
                </li>
                <li>
                  • <strong>Correction:</strong> Request correction of inaccurate data
                </li>
                <li>
                  • <strong>Deletion:</strong> Request deletion of your account and data
                </li>
                <li>
                  • <strong>Portability:</strong> Request export of your data
                </li>
                <li>
                  • <strong>Objection:</strong> Object to certain data processing activities
                </li>
              </ul>
            </div> */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">We may use third-party services for:</p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • <strong>Email Services:</strong> For transactional emails and notifications
                </li>
                <li>
                  • <strong>Analytics:</strong> To understand usage patterns and improve services
                </li>
                <li>
                  • <strong>Security:</strong> To protect against spam and abuse
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Educational Purpose</h2>
              <p className="text-gray-700">
                This application is created for educational purposes to demonstrate best practices in web development,
                data privacy, and security. It serves as a learning resource for computer science students and
                developers interested in understanding privacy-compliant application development.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> Contact us through our{" "}
                  <Link to="/contact" className="text-indigo-600 hover:text-indigo-800">
                    contact form
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
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
