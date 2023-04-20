import { render, screen } from "@testing-library/react";
import { InputFile } from "./InputFile";

describe("InputFile", () => {
  it("renders the InputFile component with a placeholder", () => {
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const placeholder = "Select a file";

    render(
      <InputFile onAdd={onAdd} onRemove={onRemove} placeholder={placeholder} />
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
});
