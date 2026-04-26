import { apiSlice } from "./apiSlice";

type fetchedUsers = {
  id: string;
  username: string;
  profileColor: string;
};

type InviteInput = {
  userId: string;
  orgId: string;
};

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUsers: builder.query<fetchedUsers[], string>({
      query: (query) => ({ url: `/user/search?q=${query}`, method: "GET" }),
      providesTags: ["FetchedUsers"],
    }),

    inviteUserToOrg: builder.mutation<void, InviteInput>({
      query: ({ userId, orgId }) => ({
        url: `/organization/${orgId}/invite`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Organization"],
    }),
  }),
});

export const { useFindUsersQuery, useInviteUserToOrgMutation } = userApi;
