export const getModifiedDateDormat = (date: string) => {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const dateArray = date.split(".");
  [dateArray[0], dateArray[1]] = [dateArray[1], dateArray[0], dateArray[2]];
  const dateString = dateArray.join("-");

  const newDate = new Date(dateString);

  return (
    dateArray[1] +
    " " +
    months[newDate.getMonth()] +
    " " +
    newDate.getFullYear()
  );
};
