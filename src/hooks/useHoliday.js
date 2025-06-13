import { useEffect, useState } from "react";

const apiKey = "apiKey";
const calendarId = "calendarID";

export const useHoliday = (isLoadHoliday, rangeStart, rangeEnd) => {
  const [holidays, setHolidays] = useState([]);
  const storageKey = `__holidays_${rangeStart}_${rangeEnd}`;

  useEffect(() => {
    if (!isLoadHoliday) {
      return;
    }

    const storageHolidays = localStorage.getItem(storageKey);
    if (storageHolidays) {
      const newHolidays = JSON.parse(storageHolidays).map((holiday) => ({
        ...holiday,
        date: new Date(holiday.date),
      }));
      setHolidays(newHolidays);
    } else {
      const startDate = new Date(rangeStart).toISOString();
      const endDate = new Date(rangeEnd).toISOString();
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${startDate}&timeMax=${endDate}`
      ).then((response) => {
        response.json().then((result) => {
          const newHolidays = result.items.map((item) => ({
            title: item.summary,
            date: new Date(item.start.date),
          }));
          setHolidays(newHolidays);
          localStorage.setItem(storageKey, JSON.stringify(newHolidays));
        });
      });
    }
  }, [isLoadHoliday, storageKey, rangeStart, rangeEnd]);

  return { holidays };
};
