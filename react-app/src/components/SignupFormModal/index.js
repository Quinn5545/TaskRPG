import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email || !email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (confirmPassword !== password)
      newErrors.match = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        history.push("/dashboard");
      }
    }
  };

  return (
    <div className="signup-form-container">
      <h1 className="signup-form-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul className="signup-form-errors">
          {/* General errors (not related to specific fields) */}
          {errors.match && <li className="error-message">{errors.match}</li>}
        </ul>
        <label className="signup-form-label">
          Email
          <input
            type="text"
            className="signup-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label className="signup-form-label">
          Username
          <input
            type="text"
            className="signup-form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </label>
        <label className="signup-form-label">
          Password
          <input
            type="password"
            className="signup-form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </label>
        <label className="signup-form-label">
          Confirm Password
          <input
            type="password"
            className="signup-form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </label>
        <button type="submit" className="signup-form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
