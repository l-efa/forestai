// "Apr 20, 2026"
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// "14:35"
export const formatTime = (date: string | Date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDueDate = (dueDate: string) => {
  const [y, m, d] = dueDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const formatted = date.toLocaleDateString("fi-FI"); // gives DD.MM.YYYY
  const label =
    daysLeft === 0
      ? "today"
      : daysLeft < 0
        ? `${Math.abs(daysLeft)}d overdue`
        : `${daysLeft}d left`;
  return `${formatted} · ${label}`;
};
