export function formatAdminDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatAdminDateTime(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function statusBadgeClass(status: string) {
  switch (status) {
    case "new":
      return "bg-brand-primary/20 text-brand-primary";
    case "contacted":
    case "read":
      return "bg-blue-500/20 text-blue-400";
    case "closed":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-white/10 text-brand-muted";
  }
}

export function capitalizeStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
