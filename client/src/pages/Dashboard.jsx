import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
import { LinkIcon as LinkPlus, Link2, BarChart2, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUrlData } from "../api/url";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });

  const uData = Array.isArray(getUrl.data) ? getUrl.data : [];
  if (getUrl.isLoading) return <LoadingSpinner />;
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back,{" "}
          <span className="font-medium text-gray-600">{user.name}!</span> Here's
          an overview of your URLs.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total URLs</p>
          <p className="text-2xl font-bold">{uData.length}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Clicks</p>
          <p className="text-2xl font-bold">{uData.clicksCount || 0}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Avg. Click Rate
          </p>
          <p className="text-2xl font-bold">
            {(uData.clicksCount / uData.length)||0}
          </p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Active URLs</p>
          <p className="text-2xl font-bold">{uData.length}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/create"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <LinkPlus className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">Create Short URL</h3>
            <p className="text-sm text-gray-500 mt-1">Shorten a new URL</p>
          </Link>

          <Link
            to="#"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <Link2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">View URLs</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your links</p>
          </Link>

          <Link
            to="#"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Track performance</p>
          </Link>

          <Link
            to="#"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">Profile</h3>
            <p className="text-sm text-gray-500 mt-1">Update your info</p>
          </Link>
        </div>
      </div>

      {/* Recent URLs */}
      {/* <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent URLs</h2>
          <Link
            href="/dashboard/urls"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View all
          </Link>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Original URL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Short URL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Clicks
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 truncate max-w-[200px]">
                      https://example.com/very-long-path-that-needs-to-be-shortened
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-indigo-600">abc123</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">245</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2 days ago
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 truncate max-w-[200px]">
                      https://anotherexample.com/blog/article/2023/05/15
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-indigo-600">xyz789</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">187</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3 days ago
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 truncate max-w-[200px]">
                      https://docs.example.org/documentation/getting-started
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-indigo-600">def456</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">132</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 days ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </main>
  );
};

export default Dashboard;
