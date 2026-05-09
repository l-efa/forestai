import { apiSlice } from "./apiSlice";

type Projects = {
  name: string;
  id: string;
  createdAt: string;
};

type Project = {
  name: string;
  id: string;
  createdAt: string;
};

type projectMember = {
  userId: string;
  role: "admin" | "moderator" | "user";
  createdAt: Date;
  user: {
    username: string;
    email: string;
    profileColor: string;
  };
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

    getProjectData: builder.query<
      Project,
      { orgId: string; projectId: string }
    >({
      query: ({ orgId, projectId }) => ({
        url: `/organization/${orgId}/project/${projectId}`,
        method: "GET",
      }),
      providesTags: ["ProjectData"],
    }),

    createProject: builder.mutation<void, { name: string; orgId: string }>({
      query: ({ name, orgId }) => ({
        url: `/organization/${orgId}/project`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteProject: builder.mutation<void, { orgId: string; projectId: string }>(
      {
        query: ({ orgId, projectId }) => ({
          url: `/organization/${orgId}/project/${projectId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Projects"],
      },
    ),
    getProjectMembers: builder.query<
      projectMember[],
      { orgId: string; projectId: string }
    >({
      query: ({ orgId, projectId }) => ({
        url: `/organization/${orgId}/project/${projectId}/teams`,
        method: "GET",
      }),
      providesTags: ["ProjectTeams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDataQuery,
  useDeleteProjectMutation,
  useGetProjectMembersQuery,
} = projectApi;
