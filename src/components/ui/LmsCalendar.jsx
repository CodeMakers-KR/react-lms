import "./LmsCalendar.css";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthGridPlugin from "@fullcalendar/multimonth";
import koLocale from "@fullcalendar/core/locales/ko";
import { useHoliday } from "../../hooks/useHoliday";

const temporaryEvents = [
  {
    title: "event 3",
    date: "2025-06-18 13:00:00",
  },
  { title: "event 3", date: "2025-05-05 13:00:00" },
  { title: "event 3", date: "2025-06-18 13:00:00" },
  { title: "event 3", date: "2025-06-18 13:00:00" },
  { title: "event 3", date: "2025-06-18 13:00:00" },
  { title: "event 3", date: "2025-06-18 13:00:00" },
  { title: "event 3", date: "2025-06-18 13:00:00" },
  { title: "event 3", date: "2025-06-03 13:00:00" },
];

export const LmsCalendar = ({
  height = "auto",
  width = "auto",
  initialView = "dayGridMonth",
  viewHoliday = true,
  viewWeekend = true,
  eventFetch = async () => {},
}) => {
  const [events, setEvents] = useState(temporaryEvents);

  const { holidays } = useHoliday(
    viewHoliday,
    new Date().getFullYear() + "-01-01",
    new Date().getFullYear() + "-12-31"
  );
  useEffect(() => {
    setEvents((prev) => [
      ...prev,
      ...holidays.map((h) => {
        const holiday = holidays.filter((hh) => {
          return hh.date.getTime() === h.date.getTime();
        });
        return {
          ...h,
          allDay: true,
          className: "custom-holiday",
          display: holiday[0].title === h.title ? "background" : "event",
          backgroundColor: "transparent",
        };
      }),
    ]);
  }, [holidays]);

  useEffect(() => {
    (async () => {
      const fetchedEvent = await eventFetch();
      if (fetchedEvent) {
        setEvents(fetchedEvent);
      }
    })();
  }, [eventFetch]);

  return (
    <div style={{ width, height }}>
      <FullCalendar
        height={height}
        dayMaxEventRows={9}
        headerToolbar={{
          start: "prevYear prev today next nextYear",
          center: "title",
          end: "multiMonthYear dayGridMonth timeGridWeek timeGridDay",
        }}
        locale={koLocale}
        plugins={[dayGridPlugin, timeGridPlugin, multiMonthGridPlugin]}
        initialView={initialView}
        weekends={viewWeekend}
        events={events}
        eventOverlap={(stillEvent, movingEvent) => {
          console.log(stillEvent, movingEvent);
          return stillEvent.display == "background";
        }}
      />
    </div>
  );
};
