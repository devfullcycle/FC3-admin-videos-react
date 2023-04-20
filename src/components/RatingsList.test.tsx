import { render } from "@testing-library/react";
import { RatingsList } from "./RatingsList";

describe("RatingsList", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<RatingsList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
