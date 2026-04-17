import { apiSlice } from "./apiSlice";

type registerType = {
  email: string;
  username: string;
  password: string;
};

type loginType = {
  username: string;
  password: string;
  remember: boolean;
};

type me = {
  username: string;
  userId: string;
};

// injectEndpoints adds these to the shared apiSlice
// so they share the same cache, tags, and baseQuery
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ message: string }, registerType>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      // When registration succeeds, refetch anything tagged "User"
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<{ message: string }, loginType>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    getMe: builder.query<me, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["User"],
    }),

    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApi;
