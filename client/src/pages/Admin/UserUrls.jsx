import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import {
  Link2,
  ExternalLink,
  Calendar,
  Activity,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Home,
  Users as UsersIcon,
  Clock,
  MousePointer,
  TrendingUp,
  Globe,
  Copy,
  BarChart3
} from "lucide-react";
import { getUserUrls } from "../../api/admin";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const UserUrls = () => {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit] = useState(20);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userUrls", userId, currentPage, sortBy, sortOrder, limit],
    queryFn: () => getUserUrls(userId, {
      page: currentPage,
      limit,
      sortBy,
      sortOrder
    }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const copyToClipboard = (shortId) => {
    const url = `${window.location.origin}/${shortId}`;
    navigator.clipboard.writeText(url);
    // Simple notification
    const notification = document.createElement('div');
    notification.textContent = '✓ URL copied to clipboard!';
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 1000;
      background: #10b981; color: white; padding: 12px 24px;
      border-radius: 8px; font-size: 14px; font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  if (!data) return <div className="p-8 text-center">No data available</div>;

  const { user, urls, summary, pagination } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/admin" className="flex items-center hover:text-gray-700">
              <Home className="h-4 w-4 mr-1" />
              Admin Dashboard
            </Link>
            <span>/</span>
            <Link to="/admin/users" className="flex items-center hover:text-gray-700">
              <UsersIcon className="h-4 w-4 mr-1" />
              Users
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{user.name}'s URLs</span>
          </nav>
        </div>

        {/* Header with User Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
                  <span className="text-lg font-medium text-white">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-500 flex items-center">
                    <span>{user.email}</span>
                    {user.role === "admin" && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                        Admin
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <p className="text-gray-500">
                Joined {formatDate(user.signupAt)} • {pagination.totalUrls} URLs created
              </p>
            </div>
            <Link
              to="/admin/users"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <Link2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total URLs</p>
                <p className="text-xl font-bold">{summary.totalUrls}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 mr-3">
                <MousePointer className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                <p className="text-xl font-bold">{summary.totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Clicks/URL</p>
                <p className="text-xl font-bold">{summary.avgClicksPerUrl.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-indigo-100 mr-3">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Recent URLs</p>
                <p className="text-xl font-bold">{summary.recentUrls}</p>
                <p className="text-xs text-gray-500">Last 7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* URLs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">URLs</h2>
                <p className="text-sm text-gray-500">All URLs created by this user</p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="createdAt">Created Date</option>
                  <option value="clicksCount">Clicks</option>
                  <option value="lastClickedAt">Last Clicked</option>
                  <option value="recentClicks">Recent Activity</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("originalUrl")}
                  >
                    <div className="flex items-center">
                      <span>Original URL</span>
                      {sortBy === "originalUrl" && (
                        <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <span>Created</span>
                      {sortBy === "createdAt" && (
                        <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("clicksCount")}
                  >
                    <div className="flex items-center">
                      <span>Clicks</span>
                      {sortBy === "clicksCount" && (
                        <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("lastClickedAt")}
                  >
                    <div className="flex items-center">
                      <span>Last Clicked</span>
                      {sortBy === "lastClickedAt" && (
                        <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls.map((url) => (
                  <tr key={url._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <div className="max-w-xs">
                          <a 
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 truncate block"
                            title={url.originalUrl}
                          >
                            {url.originalUrl.length > 50 ? url.originalUrl.substring(0, 50) + '...' : url.originalUrl}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {url.shortId}
                        </code>
                        <button
                          onClick={() => copyToClipboard(url.shortId)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                          title="Copy short URL"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(url.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm">
                        <Activity className="h-4 w-4 mr-1 text-green-500" />
                        <span className="font-medium">{url.clicksCount}</span>
                        {url.recentClicks > 0 && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            +{url.recentClicks} recent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(url.lastClickedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {url.location?.country && url.location?.city ? (
                        <span>{url.location.city}, {url.location.country}</span>
                      ) : (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <a
                          href={`/${url.shortId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Visit short URL"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {urls.map((url) => (
              <div key={url._id} className="border-b border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <Globe className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <a 
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800 truncate"
                        title={url.originalUrl}
                      >
                        {url.originalUrl.length > 40 ? url.originalUrl.substring(0, 40) + '...' : url.originalUrl}
                      </a>
                    </div>
                    <div className="flex items-center mb-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                        {url.shortId}
                      </code>
                      <button
                        onClick={() => copyToClipboard(url.shortId)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Copy short URL"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <a
                    href={`/${url.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    title="Visit short URL"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created:
                    </span>
                    <div className="font-medium">{formatDate(url.createdAt)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 flex items-center">
                      <Activity className="h-3 w-3 mr-1" />
                      Clicks:
                    </span>
                    <div className="font-medium flex items-center">
                      <span>{url.clicksCount}</span>
                      {url.recentClicks > 0 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          +{url.recentClicks}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last Click:
                    </span>
                    <div className="font-medium">{formatDate(url.lastClickedAt)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      Location:
                    </span>
                    <div className="font-medium">
                      {url.location?.country && url.location?.city ? (
                        <span>{url.location.city}, {url.location.country}</span>
                      ) : (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!pagination.hasPrev}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={!pagination.hasNext}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * limit, pagination.totalUrls)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{pagination.totalUrls}</span>{" "}
                    URLs
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={!pagination.hasPrev}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      const isCurrentPage = pageNum === currentPage;
                      
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              isCurrentPage
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNum}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                      disabled={!pagination.hasNext}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {urls.length === 0 && (
            <div className="text-center py-12">
              <Link2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No URLs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                This user hasn't created any URLs yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
