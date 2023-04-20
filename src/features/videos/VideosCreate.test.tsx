import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { VideosCreate } from "./VideosCreate";
import { baseUrl } from "../api/apiSlice";
import { genreResponse } from "../mocks/genre";
import { castMemberResponse } from "../mocks";

// mock nanoid
jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

export const handlers = [
  rest.post(`${baseUrl}/videos`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
  rest.get(`${baseUrl}/genres`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json(genreResponse));
  }),
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("VideosCreate", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<VideosCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<VideosCreate />);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const year_launched = screen.getByTestId("year_launched");
    const duration = screen.getByTestId("duration");
    const submit = screen.getByText("Save");

    fireEvent.change(title, { target: { value: "Test Video" } });
    fireEvent.change(description, { target: { value: "Test description" } });
    fireEvent.change(year_launched, { target: { value: "2022" } });
    fireEvent.change(duration, { target: { value: "120" } });

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Video created");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/videos`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<VideosCreate />);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const year_launched = screen.getByTestId("year_launched");
    const duration = screen.getByTestId("duration");
    const submit = screen.getByText("Save");

    fireEvent.change(title, { target: { value: "Test Video" } });
    fireEvent.change(description, { target: { value: "Test description" } });
    fireEvent.change(year_launched, { target: { value: "2022" } });
    fireEvent.change(duration, { target: { value: "120" } });

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getAllByText("Error creating Video");
      expect(text).toHaveLength(2);
    });
  });

  it("should handle adding a file", async () => {
    renderWithProviders(<VideosCreate />);

    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    const selectFileButton = screen.getByTestId("thumbnail-input");

    fireEvent.change(selectFileButton, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(file.name)).toBeInTheDocument();
    });
  });

  it("should handle removing a file", async () => {
    renderWithProviders(<VideosCreate />);

    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    const selectFileButton = screen.getByTestId("thumbnail-input");

    fireEvent.change(selectFileButton, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(file.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("remove"));

    await waitFor(() => {
      expect(screen.queryByDisplayValue(file.name)).not.toBeInTheDocument();
    });
  });

  it("should handle adding a file error", async () => {
    renderWithProviders(<VideosCreate />);

    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    const selectFileButton = screen.getByTestId("thumbnail-input");

    fireEvent.change(selectFileButton, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(file.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("remove"));

    await waitFor(() => {
      expect(screen.queryByDisplayValue(file.name)).not.toBeInTheDocument();
    });
  });
});
