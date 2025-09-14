export const dataFormat = (isoString: string) => {
  const date = new Date(isoString);

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;

  return formattedDate;
};
