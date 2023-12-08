import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/dashboard");
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="login-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-form-label">
          Email
          <input
            type="text"
            className="login-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-form-label">
          Password
          <input
            type="password"
            className="login-form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-form-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
