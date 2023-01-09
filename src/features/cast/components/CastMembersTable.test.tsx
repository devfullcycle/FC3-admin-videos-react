import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMembersTable } from "./CastMembersTable";

const Props = {
  data: {
    data: [
      {
        id: "123",
        type: 1,
        name: "test",
        deleted_at: null,
        created_at: "2021-03-01T00:00:00.000000Z",
        updated_at: "2021-03-01T00:00:00.000000Z",
      },
    ],
    meta: {
      currentPage: 1,
      from: 1,
      lastPage: 1,
      path: "http://localhost:8000/api/cast_members",
      perPage: 1,
      to: 1,
      total: 1,
    },
    links: {
      first: "http://localhost:8000/api/cast_members?page=1",
      last: "http://localhost:8000/api/cast_members?page=1",
      prev: "",
      next: "",
    },
  },
  perPage: 15,
  isFetching: false,
  rowsPerPage: [15, 25, 50],
  handleOnPageChange: () => {},
  handleFilterChange: () => {},
  handleOnPageSizeChange: () => {},
  handleDelete: () => {},
};

describe("CastMembersTable", () => {
  it("should render castMember talbe correcly", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMembersTable with loading", () => {
    const { asFragment } = render(<CastMembersTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMembersTable with empty data", () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} data={{ data: [], meta: {} } as any} />,
      { wrapper: BrowserRouter }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render corret type", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: 2 }],
          links: { ...Props.data.links },
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
