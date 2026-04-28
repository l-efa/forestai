import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// One createApi for your entire backend.
// All endpoints inject into this — they share the cache and tags.
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Organization", "FetchedUsers", "UserData"],
  endpoints: () => ({}), // empty — features inject their own
});
