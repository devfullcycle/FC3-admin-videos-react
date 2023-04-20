import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  selectIsAuthenticated,
  selectIsLoading,
  setAuthenticated,
  setLoading,
  setToken,
  setUserDetails,
} from "./authSlice";
import { RootState } from "../../app/store";

describe("authSlice", () => {
  let store = configureStore({ reducer: { auth: authSlice.reducer } });

  const mockState = {
    auth: {
      token: "",
      isLoading: false,
      userDetails: null,
      isAuthenticated: false,
    },
  } as RootState;

  beforeEach(() => {
    store = configureStore({ reducer: { auth: authSlice.reducer } });
  });

  it("sets isAuthenticated", () => {
    store.dispatch(setAuthenticated(true));
    expect(store.getState().auth.isAuthenticated).toBe(true);
  });

  it("sets isLoading", () => {
    store.dispatch(setLoading(true));
    expect(store.getState().auth.isLoading).toBe(true);
  });

  it("sets token", () => {
    store.dispatch(setToken("token"));
    expect(store.getState().auth.token).toBe("token");
  });

  it("sets userDetails", () => {
    store.dispatch(setUserDetails({ name: "John Doe" }));
    expect(store.getState().auth.userDetails).toEqual({ name: "John Doe" });
  });

  // selectIsAuthenticated
  it("selects isAuthenticated", () => {
    const isAuthenticated = selectIsAuthenticated(mockState);
    expect(isAuthenticated).toBe(mockState.auth.isAuthenticated);
  });

  it("selects isLoading", () => {
    const isLoading = selectIsLoading(mockState);
    expect(isLoading).toBe(mockState.auth.isLoading);
  });
});
