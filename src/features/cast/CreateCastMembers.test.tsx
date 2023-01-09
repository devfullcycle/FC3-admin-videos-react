import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CreateCastMember } from "./CreateCastMembers";
import { baseUrl } from "../api/apiSlice";

export const handlers = [
  rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CreateCastMember", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast member created");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast member not created");
      expect(text).toBeInTheDocument();
    });
  });
});
