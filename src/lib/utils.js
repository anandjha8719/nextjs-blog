export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const truncateText = (text, limit = 100) => {
  const lines = text.split("\n");
  let result = "";
  let count = 0;

  for (const line of lines) {
    if (count + line.length > limit) break;
    result += line + "\n";
    count += line.length;
  }

  return result.trim() + "...";
};
