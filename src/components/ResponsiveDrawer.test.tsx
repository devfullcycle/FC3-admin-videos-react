import { renderWithProviders, screen } from "../utils/test-utils";
import ResponsiveDrawer from "./ResponsiveDrawer";

describe("ResponsiveDrawer", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(
      <ResponsiveDrawer onClose={() => {}} open={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
