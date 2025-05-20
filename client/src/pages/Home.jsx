import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveShortUrl, getUrlData, deleteUrl } from "../api/url";
import URLTable from "../components/ui/URLTable";

export default function Home() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const queryClient = useQueryClient();

  const getUrl = useQuery({
    queryKey: ["shortUrls"],
    queryFn: getUrlData,
  });

  const urlMutation = useMutation({
    mutationFn: (originalUrl) => saveShortUrl(originalUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
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
    const url = e.target.url.value;
    urlMutation.mutate(url);
  };

  const handleCopy = () => {
    // navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    // setCopySuccess(shortUrl);

    // setTimeout(() => {
    //   setCopySuccess(null);
    // }, 2000);
  };

  const handleClick = (id) => {
    setShortenedUrls(
      shortenedUrls.map((item) =>
        item._id === id ? { ...item, clicks: item.clicks + 1 } : item
      )
    );
  };

  const handleDelete = (_id) => {
    deletMutation.mutate(_id);
  };

  const handleAnalytics = (id) => {
    // this would navigate to an analytics page
    alert(`Analytics for URL ID: ${id} - Coming soon!`);
  };

  const handleShare = (shortUrl) => {
    const shareUrl = `${window.location.origin}/${shortUrl}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Shortened URL",
          text: "Check out this shortened URL",
          url: shareUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      alert("URL copied to clipboard for sharing!");
    }
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

        {/* URLs Table */}
        {!getUrl.isLoading && uData.length > 0 ? (
          <div className="grid gap-4">
            {uData.map((item) => (
              <URLTable
                key={item._id}
                item={item}
                handleClick={handleClick}
                handleCopy={handleCopy}
                handleShare={handleShare}
                handleAnalytics={handleAnalytics}
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
