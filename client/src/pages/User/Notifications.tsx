import { useGetUserNotificationsQuery } from "@/api/user";

export default function Notifications() {
  const { data: notifications } = useGetUserNotificationsQuery();

  return (
    <div>
      <p>notifications:</p>
      {notifications?.map((notification) => (
        <div className="p-2" key={notification.id}>
          <p>{notification.createdAt.toLocaleString()}</p>
          <p>to: {notification.organization.name}</p>
          <p>by: {notification.invitedBy.username}</p>
        </div>
      ))}
    </div>
  );
}
