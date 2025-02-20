import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ createdAt }: { createdAt: string }) => {
  if (!createdAt) return <span>date</span>; // Handle undefined/null values

  const date = new Date(createdAt);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return <span>date</span>;
  }

  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
