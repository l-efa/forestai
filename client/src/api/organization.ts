import { apiSlice } from "./apiSlice";
import type { OrganizationType } from "@/types/Organization";

type NewOrganizationType = {
  name: string;
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

    deleteOrganization: builder.mutation<{ message: string }, string>({
      query: (orgId) => ({ url: `/organization/${orgId}`, method: "DELETE" }),
      invalidatesTags: ["Organization"],
    }),
  }),
});
export const {
  useCreateOrganizationMutation,
  useGetOwnedOrganizationsQuery,
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
} = organizationApi;
