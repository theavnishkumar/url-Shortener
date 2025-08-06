import {
  ExternalLink,
  Copy,
  Share2,
  Trash2,
  QrCode,
  X,
  ChartSpline,
  Download,
} from "lucide-react";
import { Link } from "react-router";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useRef, useEffect } from "react";

const URLTable = ({
  item,
  handleCopy,
  handleShare,
  handleDelete,
  isDeleting,
}) => {
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

  if (isDeleting) {
    return (
      <div className="w-full text-center">
        <div className="rounded-md p-8 border border-gray-200">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

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
  const qrRef = useRef(null);
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `qr-code-${shortUrl.split('/').pop()}.png`;
      link.href = url;
      link.click();
      showNotification('QR code downloaded successfully!');
    }
  };

  const copyQRCode = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showNotification('QR code copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy QR code:', err);
          showNotification('Failed to copy QR code');
        }
      }, 'image/png', 1.0);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      showNotification('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
      showNotification('Failed to copy URL');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-2 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm mx-auto transform transition-all relative my-4 max-h-[90vh] overflow-y-auto">
        {/* Notification */}
        {notification && (
          <div className="absolute -top-10 left-2 right-2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium z-10 shadow-lg">
            ✓ {notification}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">QR Code</h2>
            <p className="text-xs text-gray-500">Scan to access your link</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* QR Code Section */}
        <div className="p-4 space-y-4">
          {/* QR Code Display */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
            <div className="flex justify-center" ref={qrRef}>
              <div className="bg-white p-3 rounded-lg shadow-md">
                <QRCodeCanvas
                  value={shortUrl}
                  size={window.innerWidth < 640 ? 140 : 160}
                  level="M"
                  includeMargin={true}
                  fgColor="#1e293b"
                  bgColor="#ffffff"
                />
              </div>
            </div>
          </div>

          {/* URL Display */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between bg-white rounded border p-2">
              <span className="text-indigo-600 font-medium text-xs truncate pr-2">
                {shortUrl}
              </span>
              <button
                onClick={copyUrl}
                className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                title="Copy URL"
                aria-label="Copy URL to clipboard"
              >
                <Copy className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={downloadQR}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={copyQRCode}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200 text-sm"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy QR</span>
            </button>
          </div>

          {/* Open Link Button */}
          <button
            onClick={() => window.open(shortUrl, '_blank')}
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-200 text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Link</span>
          </button>

          {/* Instructions */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              📱 Scan with camera • Press ESC to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
