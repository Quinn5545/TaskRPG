import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DemoUserModal() {
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

  const loginDemo = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Log In As Demo User?</h1>
      <form onSubmit={handleSubmit}>
        <div>Click the button below to log in as a demo user</div>
        <div className="login-modal-delete-button-box">
          <button className="delete-LM-form-button" to="#" onClick={loginDemo}>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default DemoUserModal;
