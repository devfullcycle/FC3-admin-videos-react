import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CategoryEdit } from "./EditCategory";
import { baseUrl } from "../api/apiSlice";

const data = {
  id: "1",
  name: "Category 1",
  is_active: true,
  deleted_at: null,
  created_at: "2022-09-27T17:10:33+0000",
  updated_at: "2022-09-27T17:10:33+0000",
};

export const handlers = [
  rest.get(`${baseUrl}/categories/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data }));
  }),
  rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category updated successfully");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    renderWithProviders(<CategoryEdit />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category not updated");
      expect(text).toBeInTheDocument();
    });
  });
});
