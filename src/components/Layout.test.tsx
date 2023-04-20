import { renderWithProviders } from "../utils/test-utils";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
