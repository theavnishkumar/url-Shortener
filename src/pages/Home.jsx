import { useState, useEffect } from "react";
import { Copy, ExternalLink, Share2, Trash2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);

  // Load saved URLs from localStorage on component mount
  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls");
    if (savedUrls) {
      setShortenedUrls(JSON.parse(savedUrls));
    }
  }, []);

  // Save URLs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shortenedUrls", JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  const generateShortUrl = () => {
    // Generate a random 6-character string for the short URL
    return Math.random().toString(36).substring(2, 8);
  };

  const formatUrl = (inputUrl) => {
    let formattedUrl = inputUrl.trim();

    // Check if the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(formattedUrl)) {
      // If not, prepend https://
      formattedUrl = `https://${formattedUrl}`;
    }

    return formattedUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url) return;

    setIsLoading(true);

    // Format the URL to ensure it has https://
    const formattedUrl = formatUrl(url);

    // Simulate API call with timeout
    setTimeout(() => {
      const newShortenedUrl = {
        id: Date.now().toString(),
        originalUrl: formattedUrl,
        shortUrl: generateShortUrl(),
        clicks: 0,
      };

      setShortenedUrls([newShortenedUrl, ...shortenedUrls]);
      setUrl("");
      setIsLoading(false);
    }, 500);
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    setCopySuccess(shortUrl);

    // Reset copy success message after 2 seconds
    setTimeout(() => {
      setCopySuccess(null);
    }, 2000);
  };

  const handleClick = (id) => {
    setShortenedUrls(
      shortenedUrls.map((item) =>
        item.id === id ? { ...item, clicks: item.clicks + 1 } : item
      )
    );
  };

  const handleDelete = (id) => {
    setShortenedUrls(shortenedUrls.filter((item) => item.id !== id));
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
      // Fallback for browsers that don't support the Web Share API
      handleCopy(shortUrl);
      alert("URL copied to clipboard for sharing!");
    }
  };

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
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL (e.g., google.com)"
              required
              className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </form>

        {/* URLs Table */}
        {shortenedUrls.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left font-medium text-gray-500">
                    Original URL
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">
                    Short URL
                  </th>
                  <th className="py-2 px-4 text-center font-medium text-gray-500">
                    Clicks
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {shortenedUrls.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="truncate max-w-[150px] md:max-w-[250px]">
                          {item.originalUrl}
                        </span>
                        <a
                          href={item.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <a
                        href={`/${item.shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleClick(item.id)}
                        className="hover:underline"
                      >
                        {item.shortUrl}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-center">{item.clicks}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCopy(item.shortUrl)}
                          className="inline-flex items-center px-2 py-1 border border-gray-200 rounded hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                          <Copy size={16} className="mr-1" />
                          <span className="hidden sm:inline">
                            {copySuccess === item.shortUrl ? "Copied!" : "Copy"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleShare(item.shortUrl)}
                          className="inline-flex items-center px-2 py-1 border border-gray-200 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          title="Share URL"
                        >
                          <Share2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center px-2 py-1 border border-gray-200 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          title="Delete URL"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border border-gray-100 rounded-md">
            No shortened URLs yet. Enter a URL above to get started.
          </div>
        )}
      </div>
    </div>
  );
}
