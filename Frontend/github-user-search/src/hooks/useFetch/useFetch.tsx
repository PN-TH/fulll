/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, DependencyList } from "react";

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// This function take a generic type T and a fetch function that returns a promise of type T
export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: DependencyList
) => {
  const [state, setState] = useState<FetchResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Fetch data and update the state
  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await fetchFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      const err = error as Error;
      setState({
        data: null,
        loading: false,
        error: err.message || "Error",
      });
    }
  };

  // Fetch data when the dependencies change
  useEffect(() => {
    fetchData();
  }, [...dependencies]);

  return state;
};
