import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { GenreList } from "./GenreList";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks";
import { genreResponse, genreResponsePage2 } from "../mocks/genre";

const handlers = [
  rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(genreResponsePage2), ctx.delay(150));
    }
    return res(ctx.delay(150), ctx.status(200), ctx.json(genreResponse));
  }),

  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),

  rest.delete(`${baseUrl}/genres/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("GenreList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<GenreList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<GenreList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreList />);
    await waitFor(() => {
      const error = screen.getByText("Error fetching genres");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Norfolk Island");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("Norfolk Island 2");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Norfolk Island");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Norfolk Island" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle Delete Genre success", async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Norfolk Island");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Genre deleted");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle Delete Genre error", async () => {
    server.use(
      rest.delete(`${baseUrl}/genres/1`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<GenreList />);

    await waitFor(() => {
      const name = screen.getByText("Norfolk Island");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Genre not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});
