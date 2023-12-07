import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getTasksThunk } from "../../store/tasks";

export default function Dashboard() {
  const sessionUser = useSelector((state) => state.session.user);
  const allTasks = useSelector((state) => Object.values(state.tasks));
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(allTasks.filter((task) => !task.completed));

  const filteredTasks = allTasks.filter((task) => !task.completed);

  const events = [
    {
      title: "CHRISTMAS DAY",
      content: "hello",
      start: "2023-12-25",
    },
    {
      title: "chicken",
      content: "test",
      start: "2023-12-20",
    },
  ];

  filteredTasks.forEach((task) => {
    const newTaskObj = {
      title: task.name,
      content: task.description,
      start: task.due_date,
    };
    events.push(newTaskObj);
  });

  // console.log(events);
  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  return (
    <div>
      <div className="dash-char-link">
        <NavLink to={`/character/${sessionUser.id}`}>Character</NavLink>
      </div>
      <div className="dash-task-link">
        <NavLink to={`/tasks`}>Tasks</NavLink>
      </div>
      <div className="calendar-view">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"90vh"}
          events={events}
          eventDidMount={(info) => {
            // console.log(info.event._def.extendedProps.content);
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: info.event._def.extendedProps.content,
              html: true,
            });
          }}
        />
      </div>
    </div>
  );
}
