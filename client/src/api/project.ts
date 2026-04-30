import { apiSlice } from "./apiSlice";

type Projects = {
  name: string;
  id: string;
  createdAt: string;
};

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Projects[], string>({
      query: (orgId) => ({
        url: `/organization/${orgId}/project`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    createProject: builder.mutation<void, { name: string; orgId: string }>({
      query: ({ name, orgId }) => ({
        url: `/organization/${orgId}/project`,
        method: "POST",
        body: { name },
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
