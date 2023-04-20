import {
  renderWithProviders,
  within,
  screen,
  waitFor,
  fireEvent,
} from "../../utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { VideosEdit } from "./VideosEdit";

import { baseUrl } from "../api/apiSlice";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: "1", name: "Genre 1" },
          { id: "2", name: "Genre 2" },
        ],
      })
    );
  }),
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: "1", name: "Cast Member 1" },
          { id: "2", name: "Cast Member 2" },
        ],
      })
    );
  }),
  rest.get(`${baseUrl}/videos/:id`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          id: "1",
          title: "Test Video",
          categories: [],
        },
      })
    );
  }),
  rest.put(`${baseUrl}/videos/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("VideosEdit", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<VideosEdit />);
    expect(asFragment()).toMatchSnapshot();
  });
});
