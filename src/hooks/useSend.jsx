import { useState } from "react";

const useSend = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, method = "GET", body = undefined) => {
    setLoading(true);
    setIsError(false);
    setError("");
    try {
      const options = {
        method,
        headers: {},
        credentials: "include",
      };

      if (method !== "GET" && body !== undefined) {
        if (body instanceof FormData) {
          options.body = body;
        } else {
          options.headers["Content-Type"] = "application/json";
          options.body = JSON.stringify(body);
        }
      }

      const req = await fetch(process.env.NEXT_PUBLIC_API_URL + url, options);
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.error || res.message || "Something went wrong");
      }
      return res;
    } catch (error) {
      setIsError(true);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, isError, error, loading };
};

export default useSend;
