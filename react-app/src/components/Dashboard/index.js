import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getTasksThunk } from "../../store/tasks";
import "./dashboard.css";
import { getCharacterThunk } from "../../store/character";

export default function Dashboard() {
  const sessionUser = useSelector((state) => state.session.user);
  const allTasks = useSelector((state) => Object.values(state.tasks));
  const characters = useSelector((state) => state.characters);
  const history = useHistory();
  const dispatch = useDispatch();

  const filteredTasks = allTasks.filter((task) => !task.completed);
  const events = [];

  if (Object.keys(characters).length) {
    const event = filteredTasks.map((task) => ({
      title: task.name,
      content: task.description,
      start: task.due_date,
    }));

    events.push(...event);
  }

  // console.log("chars====>", characters);
  useEffect(() => {
    if (Object.keys(characters).length) {
      dispatch(getTasksThunk(characters.id));
    }
    dispatch(getCharacterThunk(sessionUser.id));
  }, [dispatch, Object.keys(characters).length, allTasks.length]);

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="dashboard-char-link">
          <NavLink to={`/character/${sessionUser.id}`}>Character</NavLink>
        </div>
        <div className="dashboard-task-link">
          <NavLink to={`/tasks`}>Tasks</NavLink>
        </div>
      </div>

      <div className="main-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          height={"90vh"}
          events={events}
          eventDidMount={(info) => {
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
