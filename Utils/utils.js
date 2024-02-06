export const shortStringDate = (date) => {
  const jsDate = new Date(date).toString();
  const splitDate = jsDate.split(":");
  splitDate.pop();
  const shortDate = splitDate.join(":");

  return shortDate;
};
