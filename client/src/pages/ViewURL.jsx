import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUrl, getUrlData } from "../api/url";
import URLTable from "../components/ui/URLTable";
import { useState } from "react";

export default function ViewURL() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });

  const deletMutation = useMutation({
    mutationFn: (_id) => deleteUrl(_id),
    onMutate: (_id) => {
      setDeletingId(_id);
    },
    onSuccess: () => {
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

  const uData = Array.isArray(getUrl.data) ? getUrl.data : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My URLs</h1>
            <p className="text-gray-500">Manage all your shortened URLs</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New URL
            </Link>
          </div>
        </div>

        {/* URLs Table */}
        {!getUrl.isLoading && uData.length > 0 ? (
          <div className="grid gap-4">
            {uData.map((item) => (
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
        ) : getUrl.isLoading ? (
          <div className="flex justify-center items-center py-12 border border-gray-200 rounded-md">
            <Spinner />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 border border-gray-200 rounded-md">
            No shortened URLs yet. Enter a URL above to get started.
          </div>
        )}
      </div>
    </div>
  );
}

const Spinner = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
};
