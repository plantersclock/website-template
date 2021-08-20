export const timestampToDate = (timestamp) => {
  const options = {
    timeZone: "UTC",
  };

  const publishDate = new Date(timestamp).toLocaleDateString("en-US", options);

  return publishDate;
};
