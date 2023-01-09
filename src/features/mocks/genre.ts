export const genreResponse = {
  data: [
    {
      id: "1",
      name: "Norfolk Island",
      is_active: true,
      deleted_at: null,
      created_at: "2022-10-20T08:28:28+0000",
      updated_at: "2022-10-20T08:28:28+0000",
      categories: [
        {
          id: "ba994b75-2b8d-4773-abe2-6b43424a2677",
          name: "PaleTurquoise",
          description: "Quae quo pariatur ut doloribus consequatur.",
          is_active: true,
          deleted_at: null,
          created_at: "2022-10-20T08:28:21+0000",
          updated_at: "2022-10-20T08:28:21+0000",
          pivot: {
            genre_id: "1",
            category_id: "ba994b75-2b8d-4773-abe2-6b43424a2677",
          },
        },
      ],
    },
  ],
  links: {
    first: "http://localhost:8000/api/genres?page=1",
    last: "http://localhost:8000/api/genres?page=7",
    prev: null,
    next: "http://localhost:8000/api/genres?page=2",
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/genres",
    per_page: 15,
    to: 15,
    total: 99,
  },
};

export const genreResponsePage2 = {
  data: [
    {
      id: "2",
      name: "Norfolk Island 2",
      is_active: true,
      deleted_at: null,
      created_at: "2022-10-20T08:28:28+0000",
      updated_at: "2022-10-20T08:28:28+0000",
      categories: [
        {
          id: "ba994b75-2b8d-4773-abe2-6b43424a2677",
          name: "PaleTurquoise",
          description: "Quae quo pariatur ut doloribus consequatur.",
          is_active: true,
          deleted_at: null,
          created_at: "2022-10-20T08:28:21+0000",
          updated_at: "2022-10-20T08:28:21+0000",
          pivot: {
            genre_id: "2",
            category_id: "ba994b75-2b8d-4773-abe2-6b43424a2677",
          },
        },
      ],
    },
  ],
  links: {
    first: "http://localhost:8000/api/genres?page=1",
    last: "http://localhost:8000/api/genres?page=7",
    prev: "http://localhost:8000/api/genres?page=1",
    next: "http://localhost:8000/api/genres?page=3",
  },
  meta: {
    current_page: 2,
    from: 16,
    last_page: 7,
    path: "http://localhost:8000/api/genres",
    per_page: 15,
    to: 30,
    total: 99,
  },
};
