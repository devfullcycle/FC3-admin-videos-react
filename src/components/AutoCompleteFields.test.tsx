import { render } from "@testing-library/react";
import { Category } from "../types/Category";
import { AutoCompleteFields } from "./AutoCompleteFields";

describe("AutoCompleteFields", () => {
  const categories: Category[] = [
    {
      id: "1",
      name: "Comedy",
      deleted_at: "",
      is_active: true,
      created_at: "2022-01-01",
      updated_at: "2022-01-01",
      description: null,
    },
    {
      id: "2",
      name: "Adventure",
      deleted_at: "",
      is_active: true,
      created_at: "2022-01-01",
      updated_at: "2022-01-01",
      description: null,
    },
  ];

  it("should render the component with loading", () => {
    const { asFragment } = render(
      <AutoCompleteFields
        name="field"
        label="Field"
        values={categories}
        options={categories}
        isDisabled={false}
        isLoading={true}
        handleChange={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
