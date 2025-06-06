import {
  ExternalLink,
  Copy,
  Share2,
  Trash2,
  QrCode,
  X,
  ChartSpline,
} from "lucide-react";
import { Link } from "react-router";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

const URLTable = ({ item, handleCopy, handleShare, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const handleOpenModal = (url) => {
    setSelectedUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUrl("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 p-4">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            {/* Original URL */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Original:</span>
              <div className="flex items-center flex-1 overflow-hidden">
                <span className="truncate text-sm">
                  {item.originalUrl.slice(0, 35)}..
                </span>
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
                className="text-indigo-600 hover:underline text-sm font-medium"
              >
                {window.location.origin}/{item.shortId}
              </a>
            </div>
          </div>
          <QRCodeCanvas
            level={"M"}
            value={`${window.location.origin}/${item.shortId}`}
            size={60}
            className="hidden sm:block cursor-pointer"
            onClick={() =>
              handleOpenModal(`${window.location.origin}/${item.shortId}`)
            }
          />
          <QRCodeCanvas
            value={`${window.location.origin}/${item.shortId}`}
            size={40}
            level={"M"}
            className="sm:hidden cursor-pointer max-[420px]:hidden"
            onClick={() =>
              handleOpenModal(`${window.location.origin}/${item.shortId}`)
            }
          />
        </div>
        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
          <div className="text-xs text-gray-500">
            {item.clicksCount} {item.clicks === 1 ? "click" : "clicks"}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleCopy(item.shortId)}
              className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
              title="Copy URL"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => handleShare(item.shortId)}
              className="p-1 text-green-600 hover:text-green-800 cursor-pointer"
              title="Share URL"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={() =>
                handleOpenModal(`${window.location.origin}/${item.shortId}`)
              }
              className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
              title="Share URL"
            >
              <QrCode size={18} />
            </button>
            <Link
              to={`/analytics/${item._id}`}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="View Analytics"
            >
              <ChartSpline size={18} />
            </Link>
            <button
              onClick={() => handleDelete(item._id)}
              className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
              title="Delete URL"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        shortUrl={selectedUrl}
      />
    </div>
  );
};

export default URLTable;

const QRCodeModal = ({ isOpen, onClose, shortUrl }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white p-4 rounded-sm shadow-md border border-gray-300 w-80 md:w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">QR Code</h2>
          <X onClick={onClose} />
        </div>
        <div className="flex justify-center mb-4">
          <QRCodeCanvas level={"M"} value={shortUrl} size={280} />
        </div>
        <p className="text-center text-indigo-600 break-all">{shortUrl}</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indifo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
