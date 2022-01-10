export const getMMDDYYYYFormat = (inputDate = new Date()) => {
  const [dateString, timeString] = new Date(inputDate).toISOString().split("T");
  const [year, month, date] = dateString.split("-");
  return `${month}/${date}/${year}`;
};
