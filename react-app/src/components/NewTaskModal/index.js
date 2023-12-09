import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createTasksThunk, getTasksThunk } from "../../store/tasks";
import "./NewTaskModal.css";
import { getCharacterThunk } from "../../store/character";

export default function NewTaskModal() {
  const sessionUser = useSelector((state) => state.session.user);
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log(characters);
  const [formData, setFormData] = useState({
    character_id: characters.id,
    name: "",
    category: "",
    description: "",
    due_date: "",
    priority: "",
    points: "",
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCharacterThunk(sessionUser.id));
  }, [dispatch, sessionUser.id]);

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

  const handleSubmit = async (e) => {
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

      // console.log(formData);
      await dispatch(createTasksThunk(formData));
      await dispatch(getTasksThunk(characters.id));

      closeModal();
    }
  };

  return (
    <div className="new-task-modal">
      <h2 className="modal-title">Create New Task</h2>
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
          Priority:
          <input
            type="range"
            name="priority"
            min="1"
            max="10"
            value={formData.priority}
            onChange={handleChange}
            className="form-slider"
          />
          <span>{formData.priority}</span>
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
          Create Task
        </button>
        <button type="button" className="submit-button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
}
