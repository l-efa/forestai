export const currentDate = new Date();

export const currentDay = new Date().getDate();

export const currentWeekday = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});

export const currentMonth = new Date().getMonth();

export const currenMonthName = new Date().toLocaleDateString("en-US", {
  month: "long",
});

export const currentYear = new Date().getFullYear();
