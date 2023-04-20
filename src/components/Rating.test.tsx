import { render } from "@testing-library/react";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Rating rating="L" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
