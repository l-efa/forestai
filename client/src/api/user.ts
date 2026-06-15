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

export type Notifications = {
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

export type userSettings = {
  id: string;
  userId: string;
  invites: boolean;
};

export type userCalendar = {
  id: string;
  userId: string;
  reminder: string;
  date: Date;
  time?: string;
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
    }),

    getUserNotifications: builder.query<Notifications[], void>({
      query: () => ({ url: `/user/notifications`, method: "GET" }),
      providesTags: ["UserData"],
    }),

    changeProfileColor: builder.mutation<void, string>({
      query: (profileColor) => ({
        url: `/user/profileColor`,
        method: "PUT",
        body: { profileColor },
      }),
      invalidatesTags: ["User"],
    }),

    getUserSettings: builder.query<userSettings, void>({
      query: () => ({ url: `/user/userSettings`, method: "GET" }),
      providesTags: ["UserSettings"],
    }),

    changeUserSettings: builder.mutation<void, { invites: boolean }>({
      query: (settings) => ({
        url: `/user/userSettings`,
        method: "PUT",
        body: { settings },
      }),
      invalidatesTags: ["UserSettings"],
    }),

    getUserCalendar: builder.query<
      userCalendar[],
      { month: number; year: number }
    >({
      query: ({ month, year }) => ({
        url: `/user/userCalendar?month=${month}&year=${year}`,
        method: "GET",
      }),
      providesTags: ["UserCalendar"],
    }),

    newReminder: builder.mutation<
      void,
      {
        date: string;
        month: number;
        year: number;
        reminder: string;
        reminderTime: string;
      }
    >({
      query: ({ date, month, year, reminder, reminderTime }) => ({
        url: `/user/userCalendar`,
        method: "PUT",
        body: { date, month, year, reminder, reminderTime },
      }),
      invalidatesTags: ["UserCalendar"],
    }),
  }),
});

export const {
  useFindUsersQuery,
  useInviteUserToOrgMutation,
  useGetUserNotificationsQuery,
  useChangeProfileColorMutation,
  useGetUserSettingsQuery,
  useChangeUserSettingsMutation,
  useGetUserCalendarQuery,
  useNewReminderMutation,
} = userApi;
