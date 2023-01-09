import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberForm } from "./CastMembersform";

const Props = {
  castMember: {
    id: "1",
    name: "Teste",
    type: 1,
    deleted_at: null,
    created_at: "2021-10-01T00:00:00.000000Z",
    updated_at: "2021-10-01T00:00:00.000000Z",
  },
  isdisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe("CastMemberForm", () => {
  it("should render castMember form  correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
