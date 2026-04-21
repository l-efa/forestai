export type OrganizationType = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    members: number;
    projects: number;
  };
};
