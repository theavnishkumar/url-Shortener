import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { redirectUrl } from "../api/url";
// import { AdsComponent } from "../components/AdsComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { LinkRedirectCard } from "../components/RedirectPage/LinkRedirectCard";
import { DevPromotionCard } from "../components/DevPromotionCard";
import { LinkNotFound } from "../components/RedirectPage/LinkNotFound";

export default function RedirectPage() {
  const { shortId } = useParams();
  const [countdown, setCountdown] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["redirect", shortId],
    queryFn: () => redirectUrl(shortId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.redirectUrl) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Checking link...
            </h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Redirect Card */}
        {isError ? (
          <LinkNotFound shortUrl={shortId} />
        ) : (
          <LinkRedirectCard countdown={countdown} />
        )}

        {/* <AdsComponent dataAdSlot="6040347430" /> */}

        {/* My Promotion */}
        <DevPromotionCard />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Made by{" "}
            <a
              href="https://theavnishkumar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Avnish Kumar
            </a>{" "}
            • Built with ❤️ for learning
          </p>
        </div>
      </div>
    </div>
  );
}
