import { apiSlice } from "./apiSlice";

type registerType = {
  email: string;
  username: string;
  password: string;
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
  }),
});

export const { useRegisterUserMutation } = authApi;
