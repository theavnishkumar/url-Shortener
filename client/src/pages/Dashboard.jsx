import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
import { LinkIcon as LinkPlus, Link2, BarChart2, User } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUrl, getDashboardData } from "../api/url";
import { LoadingSpinner } from "../components/LoadingSpinner";
import URLTable from "../components/ui/URLTable";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

  const deletMutation = useMutation({
    mutationFn: (_id) => deleteUrl(_id),
    onMutate: (_id) => {
      setDeletingId(_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  const handleDelete = (_id) => {
    deletMutation.mutate(_id);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    alert(`URL copied to clipboard: ${window.location.origin}/${shortUrl}`);
  };

  const handleShare = (shortUrl) => {
    const shareUrl = `${window.location.origin}/${shortUrl}`;
    navigator.share({
      title: "Shortened URL",
      text: "Check out this shortened URL",
      url: shareUrl,
    });
  };

  if (isLoading) return <LoadingSpinner />;

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total URLs</p>
          <p className="text-2xl font-bold">{data.totalUrls}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Clicks</p>
          <p className="text-2xl font-bold">{data.clicksCount}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Avg. Click Rate
          </p>
          <p className="text-2xl font-bold">{data.averageClickRate}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Active URLs</p>
          <p className="text-2xl font-bold">{data.activeUrls}</p>
          {/* <p className="text-xs text-green-500 mt-2">↑ 0% from last month</p> */}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            to="/view"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <Link2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">View URLs</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your links</p>
          </Link>

          <Link
            to="/analytics"
            className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex flex-col items-center text-center hover:border-indigo-500 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full mb-3">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Track performance</p>
          </Link>

          <Link
            to="/profile"
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
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Top 6 Performing URLs (last 7days)
          </h2>
          {/* <Link
            href="/dashboard/urls"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View all
          </Link> */}
        </div>

        {/* URLs Table */}
        {!data.urls.isLoading && data.urls.length > 0 ? (
          <div className="grid gap-4">
            {data.urls.map((item) => (
              <URLTable
                key={item._id}
                item={item}
                handleCopy={handleCopy}
                handleShare={handleShare}
                handleDelete={handleDelete}
                isDeleting={deletingId === item._id}
              />
            ))}
          </div>
        ) : data.urls.isLoading ? (
          <div className="flex justify-center items-center py-12 border border-gray-200 rounded-md">
            <div className="max-w-2xl w-full text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 border border-gray-200 rounded-md">
            No shortened URLs yet. Enter a URL above to get started.
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
