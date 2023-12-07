import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTasksThunk } from "../../store/tasks";
import OpenModalButton from "../OpenModalButton";
import "./Tasks.css";
import NewTaskModal from "../NewTaskModal";
import EditTaskModal from "../EditTaskModal";
import { getCharacterThunk } from "../../store/character";
import DeleteTaskModal from "../DeleteTaskModal";

export default function Tasks() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const allTasks = useSelector((state) => Object.values(state.tasks));
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("incomplete");
  // console.log(allTasks.length);
  useEffect(() => {
    dispatch(getTasksThunk());
    dispatch(getCharacterThunk(sessionUser.id));
  }, [dispatch, allTasks.length]);

  const handleCreateTask = (newTask) => {
    dispatch(getTasksThunk());
  };

  // Filter tasks based on the active tab
  const filteredTasks =
    activeTab === "completed"
      ? allTasks.filter((task) => task.completed)
      : allTasks.filter((task) => !task.completed);

  return (
    <div className="tasks-container">
      {activeTab == "incomplete" ? (
        <h1>Tasks in Progress</h1>
      ) : (
        <h1>Completed Tasks</h1>
      )}
      <div className="tabs-container">
        <button onClick={() => setActiveTab("incomplete")}>
          Incomplete Tasks
        </button>
        <button onClick={() => setActiveTab("completed")}>
          Completed Tasks
        </button>
      </div>
      <OpenModalButton
        buttonText={"Create New Task"}
        modalComponent={<NewTaskModal onSuccess={handleCreateTask} />}
      ></OpenModalButton>
      {filteredTasks.length === 0 ? (
        <p>
          No {activeTab === "incomplete" ? "incomplete" : "completed"} tasks.
        </p>
      ) : (
        <ul className="tasks-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <strong>Name:</strong> {task.name}
              <ul className="task-details-list">
                <li>
                  <strong>Category:</strong> {task.category}
                </li>
                <li>
                  <strong>Description:</strong> {task.description}
                </li>
                <li>
                  <strong>Due Date:</strong> {task.due_date}
                </li>
                {/* <li>
                <strong>Points:</strong> {task.points}
              </li> */}
                <li>
                  <strong>Priority:</strong> {task.priority}
                </li>
                <li>
                  <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
                </li>
                {task.completed ? (
                  <div>
                    <strong>XP earned:</strong> {task.priority}
                  </div>
                ) : (
                  <>
                    <OpenModalButton
                      buttonText={"Edit Task"}
                      modalComponent={<EditTaskModal task_id={task.id} />}
                    ></OpenModalButton>
                    <OpenModalButton
                      buttonText={"Delete Task"}
                      modalComponent={<DeleteTaskModal task_id={task.id} />}
                    ></OpenModalButton>
                  </>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
