import { renderHook, act } from "@testing-library/react";

import { darkTheme, lightTheme } from "../config/theme";
import { useAppTheme } from "./useAppTheme";

describe("useAppTheme", () => {
  it("should return the initial theme and a function to toggle the theme", () => {
    const { result } = renderHook(() => useAppTheme());

    expect(result.current[0]).toEqual(darkTheme);
    expect(typeof result.current[1]).toBe("function");
  });

  it("should toggle the theme when toggleTheme is called", () => {
    const { result } = renderHook(() => useAppTheme());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(lightTheme);
  });

  it("should store the theme mode in local storage", () => {
    const { result } = renderHook(() => useAppTheme());

    act(() => {
      result.current[1]();
    });

    expect(localStorage.getItem("themeMode")).toBe('"dark"');
  });
});
