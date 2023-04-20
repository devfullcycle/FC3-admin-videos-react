import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { keycloak } from "../../keycloakConfig";

export const baseUrl = "http://localhost:8000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories", "CastMembers", "Genres", "Videos"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (keycloak.token) {
        headers.set("Authorization", `Bearer ${keycloak.token}`);
      }
      return headers;
    },
  }),
});
