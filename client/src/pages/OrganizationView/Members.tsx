import { useGetOrganizationMembersQuery } from "@/api/organization";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/format";
import { avatarColors } from "@/utils/avatarColors";
import Button2 from "@/components/Button2";
import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import { useFindUsersQuery, useInviteUserToOrgMutation } from "@/api/user";

export default function Members() {
  const { orgId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [lookUpValue, setLookUpValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [invitedUser, setInvitedUser] = useState("");

  const { data: members } = useGetOrganizationMembersQuery(orgId!);
  const [inviteUser, { isLoading }] = useInviteUserToOrgMutation();

  const handleInviteMember = () => {
    console.log(invitedUser, " invited");
    inviteUser({ userId: invitedUser, orgId: orgId! });
    setShowModal((prev) => !prev);
  };

  const toggleInviteMember = () => setShowModal((prev) => !prev);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(lookUpValue);
      return () => clearTimeout(timer);
    }, 300);
  }, [lookUpValue]);

  const { data: searchResult } = useFindUsersQuery(debouncedValue, {
    skip: debouncedValue.length < 2,
  });

  return (
    <div>
      <p>Members:</p>
      <Button2 name="Invite member" changeHandler={toggleInviteMember} />
      {members &&
        members.map((member) => (
          <div
            key={member.userId}
            className={`flex max-w-md items-center gap-4 rounded-lg p-3 ${avatarColors[member.user.profileColor]}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-lg font-bold">
              {member.user.username[0]?.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{member.user.username}</p>
              <p className="text-xs opacity-80">{member.user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase opacity-90">
                {member.role}
              </p>
              <p className="text-xs opacity-60">
                {formatDate(member.createdAt)}
              </p>
            </div>
          </div>
        ))}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={toggleInviteMember}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop">
              <h2 className="mb-4 text-lg font-bold">Invite Member</h2>
              <InputField
                name="enter username"
                value={lookUpValue}
                type="text"
                handleChange={setLookUpValue}
              />
              {searchResult && searchResult.length > 0 && (
                <div className="mt-2 flex flex-col gap-1 rounded-lg border border-surface-border bg-surface-black p-2">
                  {searchResult.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setInvitedUser(user.id)}
                      className={`flex items-center gap-3 rounded-lg p-2 text-left transition-all hover:bg-surface-card ${invitedUser === user.username ? "bg-surface-active" : ""}`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${avatarColors[user.profileColor]}`}
                      >
                        {user.username[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm">{user.username}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded-lg px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
                  onClick={toggleInviteMember}
                >
                  Cancel
                </button>
                <Button2 name="Invite" changeHandler={handleInviteMember} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
