import { useGetProjectMembersQuery } from "@/api/project";
import { useParams } from "react-router-dom";

export default function Teams() {
  const { orgId, projectId } = useParams();

  const { data: members } = useGetProjectMembersQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  return (
    <div>
      <p>Teams</p>
      {members &&
        members.map((member) => (
          <div key={member.userId}>
            <p>{member.user.username}</p>
            <p>{member.userId}</p>
          </div>
        ))}
    </div>
  );
}
