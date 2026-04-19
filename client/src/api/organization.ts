import { apiSlice } from "./apiSlice";

type OrganizationType = {
  name: string;
  owner: string;
  id: string;
};

const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrganization: builder.mutation<{ message: string }, OrganizationType>(
      {
        query: (body) => ({
          url: "/organization/create",
          method: "POST",
          body,
        }),
        // When registration succeeds, refetch anything tagged "User"
        invalidatesTags: ["Organization"],
      },
    ),
  }),
});

export const { useCreateOrganizationMutation } = organizationApi;
