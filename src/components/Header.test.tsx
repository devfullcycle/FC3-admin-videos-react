import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { keycloak } from "../keycloakConfig";

// mock keycloak
jest.mock("../keycloakConfig");

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with light theme", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="light" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with dark theme", () => {
    const { asFragment } = render(<Header toggle={() => {}} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });

  // keycloak for logout
  it("should handle logout", () => {
    render(<Header toggle={() => {}} theme="dark" />);

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();

    // click logout button
    logoutButton.click();

    // check if logout is called
    expect(keycloak.logout).toHaveBeenCalled();
  });
});
