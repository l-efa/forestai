import {
  useGetOrganizationQuery,
  useGetOrganizationUserQuery,
} from "@/api/organization";
import { createContext, useContext, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { OrganizationType } from "@/types/Organization";
import type { OrganizationMembers } from "@/api/organization";

type OrgContextType = {
  orgUser: OrganizationMembers;
  org: OrganizationType;
  isloading: boolean;
  isError: boolean;
};

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const OrgContextProvider = ({ children }: { children: ReactNode }) => {
  const { orgId } = useParams();
  const { data: orgData, isLoading, isError } = useGetOrganizationQuery(orgId!);
  const { data: userInfo } = useGetOrganizationUserQuery(orgId!);

  const value: OrgContextType | undefined =
    orgData && userInfo
      ? { orgUser: userInfo, org: orgData, isloading: isLoading, isError }
      : undefined;

  return (
    <OrgContext.Provider value={value}>
      {value ? children : <p>loading</p>}
    </OrgContext.Provider>
  );
};

export const useOrgContext = () => {
  const context = useContext(OrgContext);
  if (!context) throw new Error("useOrg must be used within OrgProvider");
  return context;
};
