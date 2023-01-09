import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { GenreEdit } from "./GenreEdit";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks";

const mockData = {
  id: "1",
  name: "test",
  isActive: true,
  deleted_at: null,
  created_at: "2021-09-01T00:00:00.000000Z",
  updated_at: "2021-09-01T00:00:00.000000Z",
  categories: [],
  description: "test",
  pivot: { genre_id: "1", category_id: "1" },
};

const handlers = [
  rest.get(`${baseUrl}/genres/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json({ data: mockData }));
  }),

  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),

  rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("GenreEdit", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "test2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre updated");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    );

    renderWithProviders(<GenreEdit />);
    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "test2" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Error updating genre");
      expect(text).toBeInTheDocument();
    });
  });
});
