import { useState, useEffect } from "react";

const useFetch = (url, call) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data)).catch(() => window.location = '/error');
  }, [url, call]);

  return [data];
};

export default useFetch;