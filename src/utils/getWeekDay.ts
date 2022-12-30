export const getWeekDay = (date: string) => {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const dateArray = date.split(".");
  [dateArray[0], dateArray[1]] = [dateArray[1], dateArray[0], dateArray[2]];
  const dateString = dateArray.join("-");

  const newDate = new Date(dateString);

  return days[newDate.getDay()];
};
