import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { redirectUrl } from "../api/url";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const ShortURL = () => {
  const { shortId } = useParams();
  console.log(shortId);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["redirect", shortId],
    queryFn: () => redirectUrl(shortId),
    retry: false,
  });
  useEffect(() => {
    if (data?.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  }, [data]);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return null;
};

export default ShortURL;
