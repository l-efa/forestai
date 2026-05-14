import { createContext, useContext, type ReactNode } from "react";

import {
  useGetProjectDataQuery,
  useGetProjectUserQuery,
  type Projects,
  type projectMember,
} from "@/api/project";
import { useParams } from "react-router-dom";

type ProjectContextType = {
  projectData: Projects;
  projectUser: projectMember;
  isLoading: boolean;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { orgId, projectId } = useParams();

  const { data: projectData } = useGetProjectDataQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  const { data: projectUser } = useGetProjectUserQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  const value: ProjectContextType | undefined =
    projectData && projectUser
      ? { projectData: projectData, projectUser, isLoading: false }
      : undefined;

  return (
    <ProjectContext.Provider value={value}>
      {value ? children : <p>Loading</p>}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProject must be used within ProjectProvider");

  return context;
};
