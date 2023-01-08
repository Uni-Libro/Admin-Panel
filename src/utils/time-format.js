const timeFormatterInstance = new Intl.DateTimeFormat("fa-IR", {});

export const timeFormatter = (date) => {
  return timeFormatterInstance.format(new Date(date));
};
