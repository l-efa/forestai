import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include",
});

// endpoints whose own 401s mean something other than "session expired" —
// refreshing in response to these would be pointless or wrong
const authEndpoints = ["/auth/login", "/auth/register", "/auth/refresh"];

// Wraps the normal fetch: on a 401, silently calls /auth/refresh and retries
// the original request once before giving up.
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;
  const isAuthEndpoint = authEndpoints.some((endpoint) =>
    url.includes(endpoint),
  );

  if (result.error?.status === 401 && !isAuthEndpoint) {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// One createApi for your entire backend.
// All endpoints inject into this — they share the cache and tags.
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Organization",
    "FetchedUsers",
    "UserData",
    "Projects",
    "ProjectData",
    "ProjectTeams",
    "ChatHistory",
    "UserSettings",
    "UserCalendar",
    "Tasks",
  ],
  endpoints: () => ({}), // empty — features inject their own
});
