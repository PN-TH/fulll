import { renderHook, act } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch hook", () => {
  it("should fetch data successfully", async () => {
    const mockData = { message: "Success" };
    const mockFetchFunction = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch(mockFetchFunction, []));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      data: mockData,
      loading: false,
      error: null,
    });
  });

  it("should fetch error", async () => {
    const mockFetchFunction = jest.fn().mockRejectedValue(new Error("Error"));

    const { result } = renderHook(() => useFetch(mockFetchFunction, []));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: "Error",
    });
  });
});
