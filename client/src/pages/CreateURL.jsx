import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveShortUrl, getUrlData, deleteUrl } from "../api/url";
import URLTable from "../components/ui/URLTable";
import { useRef } from "react";
import { Link } from "react-router";

export default function CreateURL() {
  const queryClient = useQueryClient();
  const inputRef = useRef();

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });

  const urlMutation = useMutation({
    mutationFn: (originalUrl) => saveShortUrl(originalUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
      if (inputRef.current) inputRef.current.value = "";
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  const deletMutation = useMutation({
    mutationFn: (_id) => deleteUrl(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = e.target.url.value.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    urlMutation.mutate(url);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    alert(`URL copied to clipboard: ${window.location.origin}/${shortUrl}`);
  };

  const handleDelete = (_id) => {
    deletMutation.mutate(_id);
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
        <h1 className="text-2xl font-bold mb-8 text-center mt-4">
          Shorten Your URLs
        </h1>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="url"
              ref={inputRef}
              placeholder="Enter a URL (e.g., google.com)"
              required
              className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={urlMutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {urlMutation.isPending ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between px-2 py-2 text-gray-600">
          <span>Recent 5 URL</span>
          <Link className="text-indigo-700 hover:text-indigo-800" to='/view'>View all URL</Link>
        </div>
        {/* URLs Table */}
        {!getUrl.isLoading && uData.length > 0 ? (
          <div className="grid gap-4">
            {uData.slice(0, 5).map((item) => (
              <URLTable
                key={item._id}
                item={item}
                handleCopy={handleCopy}
                handleShare={handleShare}
                handleDelete={handleDelete}
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
