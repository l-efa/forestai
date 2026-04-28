import { apiSlice } from "./apiSlice";
import type { OrganizationType } from "@/types/Organization";

type NewOrganizationType = {
  name: string;
};

type OrganizationMembers = {
  userId: string;
  role: "admin" | "moderator" | "user";
  createdAt: Date;
  user: {
    username: string;
    email: string;
    profileColor: string;
  };
};

type MemberRemoveInput = {
  userId: string;
  orgId: string;
};

const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrganization: builder.mutation<
      { message: string },
      NewOrganizationType
    >({
      query: (body) => ({
        url: "/organization",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Organization"],
    }),

    getOwnedOrganizations: builder.query<OrganizationType[], void>({
      query: () => ({ url: "/organization", method: "GET" }),
      providesTags: ["Organization"],
    }),

    getOrganization: builder.query<OrganizationType, string>({
      query: (orgId) => ({ url: `/organization/${orgId}`, method: "GET" }),
      providesTags: ["Organization"],
    }),

    getOrganizationMembers: builder.query<OrganizationMembers[], string>({
      query: (orgId) => ({
        url: `/organization/${orgId}/members`,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    deleteOrganization: builder.mutation<{ message: string }, string>({
      query: (orgId) => ({ url: `/organization/${orgId}`, method: "DELETE" }),
      invalidatesTags: ["Organization"],
    }),

    removeMember: builder.mutation<{ message: string }, MemberRemoveInput>({
      query: ({ userId, orgId }) => ({
        url: `/organization/${orgId}/members`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Organization"],
    }),

    acceptInvitation: builder.mutation<{ message: string }, string>({
      query: (invitationId) => ({
        url: `/organization/invitations/${invitationId}/accept`,
        method: "POST",
      }),
      invalidatesTags: ["Organization", "UserData"],
    }),

    declineInvitation: builder.mutation<void, string>({
      query: (invitationId) => ({
        url: `/organization/invitations/${invitationId}/decline`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserData"],
    }),
  }),
});
export const {
  useCreateOrganizationMutation,
  useGetOwnedOrganizationsQuery,
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
  useGetOrganizationMembersQuery,
  useRemoveMemberMutation,
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} = organizationApi;
