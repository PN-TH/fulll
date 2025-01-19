import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce hook", () => {
  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "" },
    });

    expect(result.current).toBe("");
    rerender({ value: "reactjs" });
    expect(result.current).toBe("");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("reactjs");
  });
});
