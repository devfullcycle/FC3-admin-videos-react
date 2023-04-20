import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { KeycloakProvider } from "./providers/KeycloakProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);
const store = setupStore();

root.render(
  <Provider store={store}>
    <KeycloakProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </KeycloakProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
