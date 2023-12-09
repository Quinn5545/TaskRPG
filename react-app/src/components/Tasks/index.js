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
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Tasks() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const allTasks = useSelector((state) => Object.values(state.tasks));
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("incomplete");
  const character = useSelector((state) => state.characters);

  // console.log("char", Object.keys(character).length);
  // console.log("allTasks", allTasks);
  // console.log(character);
  useEffect(() => {
    if (Object.keys(character).length) {
      // console.log("inside---->", character);
      dispatch(getTasksThunk(character.id));
    }
    dispatch(getCharacterThunk(sessionUser.id));
  }, [dispatch, allTasks.length, Object.keys(character).length]);

  const handleCreateTask = (newTask) => {
    dispatch(getTasksThunk(character.id));
  };

  // Filter tasks based on the active tab
  const filteredTasks =
    activeTab === "completed"
      ? allTasks.filter((task) => task.completed)
      : allTasks.filter((task) => !task.completed);

  // console.log(filteredTasks);
  return (
    <div className="tasks-container">
      {!Object.keys(character).length ? (
        <div className="no-char-box">
          <h2 className="no-char-title">
            Please Create a Character Before Creating a Task!
          </h2>
          <div>
            <div className="dash-char-link">
              <NavLink to={`/character/${sessionUser.id}`}>Character</NavLink>
            </div>
          </div>
        </div>
      ) : (
        <>
          {activeTab === "incomplete" ? (
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
          <div className="tabs-container">
            <OpenModalButton
              buttonText={"Create New Task"}
              modalComponent={<NewTaskModal onSuccess={handleCreateTask} />}
            ></OpenModalButton>
          </div>
          {filteredTasks.length === 0 ? (
            <p>
              No {activeTab === "incomplete" ? "incomplete" : "completed"}{" "}
              tasks.
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
                      <strong>Completed:</strong>{" "}
                      {task.completed ? "Yes" : "No"}
                    </li>
                    {task.completed ? (
                      <div>
                        <strong>XP earned:</strong> {task.priority}
                      </div>
                    ) : (
                      <>
                        <div className="tabs-container">
                          <OpenModalButton
                            buttonText={"Edit Task"}
                            modalComponent={<EditTaskModal task_id={task.id} />}
                          ></OpenModalButton>
                          <OpenModalButton
                            buttonText={"Delete Task"}
                            modalComponent={
                              <DeleteTaskModal task_id={task.id} />
                            }
                          ></OpenModalButton>
                        </div>
                      </>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
