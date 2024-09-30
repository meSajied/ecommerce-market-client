import React, { useState, useEffect } from "react";
import { fetcher } from "./fetcher";

function FetchCategory() {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = (await fetcher.get('/product/all')).data;
        const dataArray = Array.isArray(resData) ? resData : [resData];
        setAllCategory(dataArray);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array should be empty to fetch only once on mount

  console.log(allCategory);

  return { allCategory, loading, error };
}

export { FetchCategory };
