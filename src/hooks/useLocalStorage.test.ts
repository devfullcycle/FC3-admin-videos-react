import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

// Mock the window.localStorage object
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear the mockLocalStorage before each test
    mockLocalStorage.clear();
  });

  it("initializes with an initial value when local storage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );
    expect(result.current[0]).toBe("initialValue");
  });

  it("initializes with an existing value in local storage", () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );
    expect(result.current[0]).toBe("storedValue");
  });

  it("sets a new value with setValue", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify("newValue")
    );
  });

  it("sets a new value using a function with setValue", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", 0));

    act(() => {
      result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(1)
    );
  });

  it("handles errors when reading from local storage", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    mockLocalStorage.getItem.mockImplementationOnce(() => {
      throw new Error("Error reading from local storage");
    });

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    expect(result.current[0]).toBe("initialValue");
    expect(consoleSpy).toHaveBeenCalledWith(
      new Error("Error reading from local storage")
    );
    consoleSpy.mockRestore();
  });

  it("handles errors when writing to local storage", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    mockLocalStorage.setItem.mockImplementationOnce(() => {
      throw new Error("Error writing to local storage");
    });

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue"); // This line should be updated
    expect(consoleSpy).toHaveBeenCalledWith(
      new Error("Error writing to local storage")
    );
    consoleSpy.mockRestore();
  });
});
