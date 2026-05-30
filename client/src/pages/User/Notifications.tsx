import {
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} from "@/api/organization";
import { useGetUserNotificationsQuery } from "@/api/user";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import { formatTime, formatDate } from "@/utils/format";

export default function Notifications() {
  const [acceptInvite] = useAcceptInvitationMutation();
  const [declineInvite] = useDeclineInvitationMutation();

  const { data: notifications } = useGetUserNotificationsQuery();

  const handleNotificationAccept = async (inviteId: string) => {
    acceptInvite(inviteId);
  };

  const handleNotificationDecline = async (inviteId: string) => {
    declineInvite(inviteId);
  };

  return (
    <div className="flex flex-col gap-3">
      {!notifications?.length ? (
        <p className="text-sm text-content-muted">No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col gap-3 rounded-lg border border-surface-border p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-content-primary">
                {notification.invitedBy.username} invited you to{" "}
                <span className="text-forest-400">
                  {notification.organization.name}
                </span>
              </p>
              <span className="text-xs text-content-muted">
                {formatDate(notification.createdAt)}{" "}
                {formatTime(notification.createdAt)}
              </span>
            </div>
            <div className="flex gap-2">
              <Button2
                name="Accept"
                changeHandler={() => handleNotificationAccept(notification.id)}
              />
              <Button
                name="Decline"
                changeHandler={() => handleNotificationDecline(notification.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
