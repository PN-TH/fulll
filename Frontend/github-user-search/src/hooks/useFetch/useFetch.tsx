/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, DependencyList } from "react";

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: DependencyList
) => {
  const [state, setState] = useState<FetchResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await fetchFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message || "Error" });
    }
  }

  useEffect(() => {
    fetchData();
  }, [...dependencies]);


  return state;
};
