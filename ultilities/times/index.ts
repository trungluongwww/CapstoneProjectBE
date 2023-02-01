// return [from,to]
const getStartEndOfWeek = (date: Date): [Date, Date] => {
  date.setDate(date.getDate() - date.getDay());
  date.setUTCHours(0, 0, 0, 0);

  let startDay = new Date(date);

  date.setDate(date.getDate() + 6);

  let endDate = new Date(date);

  return [startDay, endDate];
};

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

// return [from,to]
const getStartEndOfMonth = (date: Date): [Date, Date] => {
  date.setDate(date.getDate() - date.getDate() + 1);
  date.setUTCHours(0, 0, 0, 0);
  let startDay = new Date(date);

  date.setDate(
    date.getDate() + daysInMonth(date.getMonth(), date.getFullYear()) - 1
  );

  date.setUTCHours(23, 59, 59, 0);
  let endDate = new Date(date);

  return [startDay, endDate];
};

// return [from,to]
const getStartEndLastDays = (date: Date, n: number): [Date, Date] => {
  const b = new Date(date.toString());
  b.setDate(b.getDate() - n);

  return [b, date];
};

//return [from,to]
const getTimeStartEndOfDay = (date: Date): [Date, Date] => {
  date.setHours(0, 0, 0, 0);
  let start = new Date(date.toString());
  date.setHours(date.getHours() + 24);
  let end = new Date(date.toString());
  return [start, end];
};

export default {
  getStartEndOfMonth,
  getStartEndOfWeek,
  getStartEndLastDays,
  getTimeStartEndOfDay,
};
