import React from "react";
import { ExternalLink, Copy, Share2, BarChart2, Trash2 } from "lucide-react";

const URLTable = ({
  item,
  handleClick,
  handleCopy,
  handleShare,
  handleAnalytics,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-md shadow border border-gray-200 p-4">
      <div className="flex flex-col space-y-3">
        {/* Original URL */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Original:</span>
          <div className="flex items-center flex-1 overflow-hidden">
            <span className="truncate text-sm">{item.originalUrl}</span>
            <a
              href={item.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Short URL */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Short URL:</span>
          <a
            href={`/${item.shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(item._id)}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            {window.location.origin}/{item.shortId}
          </a>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
          <div className="text-xs text-gray-500">
            {item.clicksCount} {item.clicks === 1 ? "click" : "clicks"}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleCopy(item.shortId)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Copy URL"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={() => handleShare(item.shortId)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Share URL"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={() => handleAnalytics(item._id)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="View Analytics"
            >
              <BarChart2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Delete URL"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLTable;
