import { apiSlice } from "./apiSlice";

export type Projects = {
  name: string;
  id: string;
  createdAt: string;
};

type Project = {
  name: string;
  id: string;
  createdAt: string;
  role: "owner" | "admin" | "member";
};

export type projectMember = {
  userId: string;
  role: "admin" | "moderator" | "member";
  createdAt: Date;
  user: {
    username: string;
    email: string;
    profileColor: string;
  };
};

type addUserType = {
  orgId: string;
  projectId: string;
  selectedUser: string;
};

export type Message = {
  id: string;
  message: string;
  createdAt: string;
  user: {
    username: string;
  };
};

export interface Tasks {
  id: string;
  name: string;
  order: number;
  projectId: string;
  cards?: Cards[];
}

interface Cards {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  order: number;
  tableId: string;
  createdAt: Date;
}

interface OrderedTables {
  id: string;
  order: number;
}

interface NewTask {
  orgId: string;
  projectId: string;
  taskName: string;
  description?: string;
  dueDate?: string;
  tableId: string;
}

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

    getProjectUser: builder.query<
      projectMember,
      { orgId: string; projectId: string }
    >({
      query: ({ orgId, projectId }) => ({
        url: `/organization/${orgId}/project/${projectId}/userinfo`,
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

    addUser: builder.mutation<void, addUserType>({
      query: ({ orgId, projectId, selectedUser }) => ({
        url: `/organization/${orgId}/project/${projectId}/teams`,
        method: "POST",
        body: { selectedUser },
      }),
      invalidatesTags: ["ProjectTeams"],
    }),

    removeProjectMember: builder.mutation<
      void,
      { orgId: string; projectId: string; removedUser: string }
    >({
      query: ({ orgId, projectId, removedUser }) => ({
        url: `/organization/${orgId}/project/${projectId}/teams`,
        method: "DELETE",
        body: { removedUser },
      }),
      invalidatesTags: ["ProjectTeams"],
    }),

    getChatHistory: builder.query<
      Message[],
      { orgId: string; projectId: string }
    >({
      query: ({ orgId, projectId }) => ({
        url: `/organization/${orgId}/project/${projectId}/chat`,
        method: "GET",
      }),
      providesTags: ["ChatHistory"],
    }),

    getTasks: builder.query<Tasks[], { orgId: string; projectId: string }>({
      query: ({ orgId, projectId }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),

    addTaskTable: builder.mutation<
      void,
      { orgId: string; projectId: string; name: string }
    >({
      query: ({ orgId, projectId, name }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Tasks"],
    }),

    editTaskTable: builder.mutation<
      void,
      { orgId: string; projectId: string; name: string; tableId: string }
    >({
      query: ({ orgId, projectId, name, tableId }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks`,
        method: "PATCH",
        body: { tableId, name },
      }),
      invalidatesTags: ["Tasks"],
    }),

    orderTaskTable: builder.mutation<
      void,
      { orgId: string; projectId: string; tables: OrderedTables[] }
    >({
      query: ({ orgId, projectId, tables }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks/order`,
        method: "PATCH",
        body: { tables },
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTaskTable: builder.mutation<
      void,
      { orgId: string; projectId: string; tableId: string }
    >({
      query: ({ orgId, projectId, tableId }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks`,
        method: "DELETE",
        body: { tableId },
      }),
      invalidatesTags: ["Tasks"],
    }),

    addTaskCard: builder.mutation<void, NewTask>({
      query: ({
        orgId,
        projectId,
        taskName,
        description,
        dueDate,
        tableId,
      }) => ({
        url: `/organization/${orgId}/project/${projectId}/tasks/card`,
        method: "POST",
        body: { taskName, description, dueDate, tableId },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDataQuery,
  useDeleteProjectMutation,
  useGetProjectMembersQuery,
  useAddUserMutation,
  useRemoveProjectMemberMutation,
  useGetProjectUserQuery,
  useGetChatHistoryQuery,
  useGetTasksQuery,
  useAddTaskTableMutation,
  useEditTaskTableMutation,
  useOrderTaskTableMutation,
  useDeleteTaskTableMutation,
  useAddTaskCardMutation,
} = projectApi;
