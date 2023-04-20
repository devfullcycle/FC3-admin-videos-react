import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { setupStore } from "./app/store";
import { KeycloakProvider } from "./providers/KeycloakProvider";
import { render, screen } from "./utils/test-utils";

// mock nanoid
jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

describe("App", () => {
  it("renders the root component without crashing", () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <KeycloakProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </KeycloakProvider>
      </Provider>
    );

    // Add a data-testid to the top-level element in App.tsx
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
