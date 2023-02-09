import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
  xit("should render correctly", () => {
    const { asFragment } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
