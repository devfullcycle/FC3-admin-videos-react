export const categoryResponse = {
  data: [
    {
      id: "cbdd550c-ad46-4e50-be8d-a8266aff4162",
      name: "PaleTurquoise",
      description: "Explicabo nemo voluptate aut nostrum impedit minus.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-09-27T17:10:33+0000",
      updated_at: "2022-09-27T17:10:33+0000",
    },
    {
      id: "c9f5b9b9-9b9a-4b9a-8b9a-9b9a9b9a9b9a",
      name: "PapayaWhip",
      description: "Quia voluptatem voluptatem.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-09-27T17:10:33+0000",
      updated_at: "2022-09-27T17:10:33+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/categories?page=1",
    last: "http://localhost:8000/api/categories?page=7",
    prev: null,
    next: "http://localhost:8000/api/categories?page=2",
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/categories",
    per_page: 15,
    to: 15,
    total: 95,
  },
};

export const categoryResponsePage2 = {
  data: [
    {
      id: "cbdd550c-ad46-4e50-be8d-a8266aff4163",
      name: "SeaGreen",
      description: "Explicabo nemo voluptate aut nostrum impedit minus.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-09-27T17:10:33+0000",
      updated_at: "2022-09-27T17:10:33+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/categories?page=1",
    last: "http://localhost:8000/api/categories?page=7",
    prev: "http://localhost:8000/api/categories?page=1",
    next: "http://localhost:8000/api/categories?page=3",
  },
  meta: {
    current_page: 2,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/categories",
    per_page: 15,
    to: 15,
    total: 95,
  },
};

export const castMemberResponse = {
  data: [
    {
      id: "f55fca48-d422-48bf-b212-956215eddcaf",
      name: "Teste",
      type: 1,
      deleted_at: null,
      created_at: "2022-10-03T16:23:27+0000",
      updated_at: "2022-10-03T16:23:27+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/cast_members?page=1",
    last: "http://localhost:8000/api/cast_members?page=7",
    prev: null,
    next: "http://localhost:8000/api/cast_members?page=2",
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/cast_members",
    per_page: 15,
    to: 15,
    total: 100,
  },
};

export const castMemberResponsePage2 = {
  data: [
    {
      id: "f55fca48-d422-48bf-b212-956215eddcae",
      name: "Teste 2",
      type: 1,
      deleted_at: null,
      created_at: "2022-10-03T16:23:27+0000",
      updated_at: "2022-10-03T16:23:27+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/cast_members?page=1",
    last: "http://localhost:8000/api/cast_members?page=7",
    prev: "http://localhost:8000/api/cast_members?page=1",
    next: "http://localhost:8000/api/cast_members?page=3",
  },
  meta: {
    current_page: 2,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/cast_members",
    per_page: 15,
    to: 15,
    total: 100,
  },
};
