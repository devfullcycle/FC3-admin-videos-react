import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { keycloak } from "../keycloakConfig";
import { KeycloakProvider } from "./KeycloakProvider";
import { authSlice } from "../features/auth/authSlice";

jest.mock("../keycloakConfig");

const mockKeycloak = keycloak as jest.Mocked<typeof keycloak>;

describe("KeycloakProvider", () => {
  beforeEach(() => {
    mockKeycloak.init.mockReset();
    mockKeycloak.loadUserInfo.mockReset();
  });

  it("initializes keycloak and sets user details on successful authentication", async () => {
    mockKeycloak.init.mockResolvedValue(true);
    mockKeycloak.loadUserInfo.mockResolvedValue({
      sub: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    });

    const store = configureStore({
      reducer: { auth: authSlice.reducer },
    });

    render(
      <Provider store={store}>
        <KeycloakProvider>Test</KeycloakProvider>
      </Provider>
    );

    // Wait for the useEffect to finish
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
    expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(1);
    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(store.getState().auth.userDetails).toEqual({
      sub: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  it("initializes keycloak and sets isAuthenticated to false on failed authentication", async () => {
    mockKeycloak.init.mockResolvedValue(false);

    const store = configureStore({
      reducer: { auth: authSlice.reducer },
    });

    render(
      <Provider store={store}>
        <KeycloakProvider>Test</KeycloakProvider>
      </Provider>
    );

    // Wait for the useEffect to finish
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
    expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.userDetails).toBeNull();
  });

  it("initializes keycloak and sets isAuthenticated to false on error", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    mockKeycloak.init.mockRejectedValue(new Error("Test error"));

    const store = configureStore({
      reducer: { auth: authSlice.reducer },
    });

    render(
      <Provider store={store}>
        <KeycloakProvider>Test</KeycloakProvider>
      </Provider>
    );

    // Wait for the useEffect to finish
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
    expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.userDetails).toBeNull();

    // Restore the original console.error function
    console.error = originalConsoleError;
  });

  it("updates token and dispatches setToken action when token expires", async () => {
    const mockUpdateToken = jest.fn().mockResolvedValue(true);
    mockKeycloak.updateToken = mockUpdateToken;

    const store = configureStore({
      reducer: { auth: authSlice.reducer },
    });

    render(
      <Provider store={store}>
        <KeycloakProvider>Test</KeycloakProvider>
      </Provider>
    );

    if (!mockKeycloak.onTokenExpired) {
      throw new Error("onTokenExpired is not defined");
    }

    // Trigger the onTokenExpired event
    mockKeycloak.onTokenExpired();

    // Wait for the updateToken promise to resolve
    await waitFor(() => expect(mockUpdateToken).toHaveBeenCalledTimes(1));

    // Check if the updateToken method was called with the correct argument
    expect(mockUpdateToken).toHaveBeenCalledWith(70);

    // Check if the setToken action was dispatched with the correct token
    expect(store.getState().auth.token).toBe(mockKeycloak.token);
  });
});
