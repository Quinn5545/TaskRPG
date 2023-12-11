import { useDispatch, useSelector } from "react-redux";
import "./EditTaskModal.css";

import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { editTasksThunk, getTasksThunk } from "../../store/tasks";
import { addCharacterXpThunk, getCharacterThunk } from "../../store/character";

export default function EditTaskModal({ task_id }) {
  // console.log(task_id);
  const sessionUser = useSelector((state) => state.session.user);
  const character = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  //   console.log(character);
  const { closeModal } = useModal();
  const task = useSelector((state) => state.tasks);
  //   console.log(task);
  const previousTask = task[task_id];
  //   console.log(previousTask);
  const [formData, setFormData] = useState({
    character_id: character.id,
    name: previousTask.name,
    category: previousTask.category,
    description: previousTask.description,
    due_date: previousTask.due_date,
    priority: previousTask.priority,
    points: previousTask.priority,
    completed: previousTask.completed,
  });

  // console.log("formdata======>", formData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "priority") {
      const points = Math.floor(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        points: points,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    const newErrors = {};
    if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (formData.category.length < 3) {
      newErrors.category = "Category must be at least 3 characters long.";
    }

    if (formData.description.length < 3) {
      newErrors.description = "Description must be at least 3 characters long.";
    }

    if (formData.points <= 0) {
      newErrors.points = "Points must be greater than 0.";
    }

    if (formData.priority <= 0) {
      newErrors.priority = "Priority must be greater than 0.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      const xp_to_add = { xp: formData.priority };
      //   console.log(xp_to_add);

      if (formData.completed) {
        dispatch(editTasksThunk(task_id, formData));
        dispatch(addCharacterXpThunk(sessionUser.id, xp_to_add));
        dispatch(getTasksThunk(character.id));
        closeModal();
        alert(`${formData.points} xp Added to ${character.name}!!`);
      } else {
        dispatch(editTasksThunk(task_id, formData));
        dispatch(getTasksThunk(character.id));
        closeModal();
      }
    }
  };

  useEffect(() => {
    dispatch(getCharacterThunk(sessionUser.id));
  }, [dispatch, sessionUser]);

  return (
    <div className="new-task-modal">
      <h2 className="modal-title">Edit Task</h2>
      <form className="new-task-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </label>
        <label className="form-label">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          />
          {errors.category && (
            <p className="error-message">{errors.category}</p>
          )}
        </label>
        <label className="form-label">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          ></textarea>
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </label>
        <label className="form-label">
          Due Date:
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="form-input"
          />
          {errors.due_date && (
            <p className="error-message">{errors.due_date}</p>
          )}
        </label>
        <label className="form-label">
          Priority: <span>{formData.priority}</span>
          <input
            type="range"
            name="priority"
            min="1"
            max="10"
            value={formData.priority}
            onChange={handleChange}
            className="form-slider"
          />
          {errors.priority && (
            <p className="error-message">{errors.priority}</p>
          )}
        </label>
        {/* <label className="form-label">
          Points:
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className="form-input"
          />
          {errors.points && <p className="error-message">{errors.points}</p>}
        </label> */}
        <label className="form-label">
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="form-checkbox"
          />
        </label>
        <button type="submit" className="submit-button">
          Save Task
        </button>
        <button type="button" className="submit-button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
}
