import {
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} from "@/api/organization";
import { useGetUserNotificationsQuery } from "@/api/user";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";

export default function Notifications() {
  const { data: notifications } = useGetUserNotificationsQuery();
  const [acceptInvite] = useAcceptInvitationMutation();
  const [declineInvite] = useDeclineInvitationMutation();

  const handleNotificationAccept = async (inviteId: string) => {
    console.log("accept");
    acceptInvite(inviteId);
  };

  const handleNotificationDecline = async (inviteId: string) => {
    console.log("decline");
    declineInvite(inviteId);
  };

  return (
    <div>
      <p>notifications:</p>
      {notifications?.map((notification) => (
        <div className="p-2" key={notification.id}>
          <p>{notification.createdAt.toLocaleString()}</p>
          <p>to: {notification.organization.name}</p>
          <p>by: {notification.invitedBy.username}</p>
          <Button2
            name="Accept"
            changeHandler={() => {
              handleNotificationAccept(notification.id);
            }}
          />
          <Button
            name="Decline"
            changeHandler={() => {
              handleNotificationDecline(notification.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
