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

type Notifications = {
  id: string;
  createdAt: Date;
  organization: {
    id: string;
    name: string;
  };
  invitedBy: {
    id: string;
    username: string;
  };
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

    getUserNotifications: builder.query<Notifications[], void>({
      query: () => ({ url: `/user/notifications`, method: "GET" }),
      providesTags: ["UserData"],
    }),
  }),
});

export const {
  useFindUsersQuery,
  useInviteUserToOrgMutation,
  useGetUserNotificationsQuery,
} = userApi;
