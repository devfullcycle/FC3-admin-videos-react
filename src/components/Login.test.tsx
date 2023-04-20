import { renderWithProviders } from "../utils/test-utils";
import Login from "./Login";

describe("Login", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});
