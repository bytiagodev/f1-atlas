import { useState, useEffect } from "react";
import { fetchF1 } from "../utils/api.js";

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchF1(endpoint);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [endpoint]);

  return { data, loading, error };
}