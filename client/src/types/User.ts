export type User = {
  id: string;
  username: string;
  role: "user" | "moderator" | "admin";
};
