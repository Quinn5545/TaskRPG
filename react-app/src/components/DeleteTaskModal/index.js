import React from "react";
import "./DeleteTaskModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteTasksThunk, getTasksThunk } from "../../store/tasks";

export default function DeleteTaskModal({ task_id }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log(task_id);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTasksThunk(task_id));
      await dispatch(getTasksThunk());
      closeModal();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="delete-task-modal">
      <h2 className="delete-modal-title">Delete Task</h2>
      <p className="delete-modal-text">
        Are you sure you want to delete this task?
      </p>
      <div className="delete-modal-buttons">
        <button className="delete-modal-delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="delete-modal-cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
