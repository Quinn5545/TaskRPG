import React from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Dashboard() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  if (!sessionUser) {
    history.push("/");
    return null;
  }
  return (
    <div>
      <div>
        <NavLink to={`/character/${sessionUser.id}`}>Character</NavLink>
      </div>
      <div className="calendar-view">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  );
}
