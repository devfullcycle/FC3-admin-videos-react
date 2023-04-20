import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { videoResponse, videoResponsePage2 } from "../mocks";
import { VideosList } from "./VideosList";

export const handlers = [
  rest.get(`${baseUrl}/videos`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(videoResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(videoResponse), ctx.delay(150));
  }),

  rest.delete(`${baseUrl}/videos/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(204));
  }),
];

const server = setupServer(...handlers);

describe("VideosList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<VideosList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<VideosList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<VideosList />);

    await waitFor(() => {
      const name = screen.getByText("Ut quod quia quibusdam.");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/videos`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<VideosList />);
    await waitFor(() => {
      const error = screen.getByText(/error/i);
      expect(error).toBeInTheDocument();
    });
  });

  it("should paginate videos", async () => {
    renderWithProviders(<VideosList />);
    await waitFor(() => {
      const name = screen.getByText("Ut quod quia quibusdam.");
      expect(name).toBeInTheDocument();
    });
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    await waitFor(() => {
      const name = screen.getByText("Ut quod quia quibusdam.");
      expect(name).toBeInTheDocument();
    });
  });
});
