import { mapGenreToForm } from "./util";

describe("mapGenreToForm", () => {
  it("should map genre to form", () => {
    const formData = mapGenreToForm({
      id: "1",
      name: "test",
      isActive: true,
      deleted_at: null,
      created_at: "2021-09-01T00:00:00.000000Z",
      updated_at: "2021-09-01T00:00:00.000000Z",
      categories: [
        {
          id: "1",
          name: "test",
          deleted_at: "",
          is_active: true,
          created_at: "2021-09-01T00:00:00.000000Z",
          updated_at: "2021-09-01T00:00:00.000000Z",
          description: "test",
        },
      ],
      description: "test",
      pivot: {
        genre_id: "1",
        category_id: "1",
      },
    });

    expect(formData).toEqual({
      id: "1",
      name: "test",
      categories_id: ["1"],
    });
  });
});
