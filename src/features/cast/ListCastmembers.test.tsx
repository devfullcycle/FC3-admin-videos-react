import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  screen,
  waitFor,
  fireEvent,
  renderWithProviders,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { ListCastmembers } from "./ListCastmembers";
import { castMemberResponse, castMemberResponsePage2 } from "../mocks";

const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    // check if is page 2
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(castMemberResponsePage2), ctx.delay(150));
    }

    return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
  }),

  rest.delete(
    `${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("ListCastmembers", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCastmembers />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<ListCastmembers />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<ListCastmembers />);
    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<ListCastmembers />);

    await waitFor(() => {
      const error = screen.getByText("Error!");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    renderWithProviders(<ListCastmembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("Teste 2");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<ListCastmembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Teste" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle Delete Category success", async () => {
    renderWithProviders(<ListCastmembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Cast member deleted");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle Delete Category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<ListCastmembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Cast member not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});
