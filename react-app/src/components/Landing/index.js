import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";
import "./Landing.css";
import { getModelsThunk } from "../../store/models";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DemoUserModal from "../DemoUserModal";

export default function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  const models = useSelector((state) => state.models.models);
  const dispatch = useDispatch();

  // console.log(models);

  useEffect(() => {
    dispatch(getModelsThunk());
  }, [dispatch, sessionUser]);

  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to TaskRPG</h1>
      </header>
      {!sessionUser ? (
        <main>
          <section className="intro-section">
            <h2>TaskRPG - Your Ultimate Task Management Adventure</h2>
            <p>
              Embark on a journey of productivity and self-improvement with
              TaskRPG. Complete tasks and level up your character as you achieve
              your goals!
            </p>
          </section>
          <section className="get-started-section">
            <h2>Get Started</h2>
            <p>
              Ready to start your TaskRPG journey? Sign up or log in to begin
              your adventure and transform the way you tackle tasks.
            </p>
            <div className="tabs-container">
              <OpenModalButton
                className="signup-button"
                buttonText={"Sign Up"}
                modalComponent={<SignupFormModal />}
              ></OpenModalButton>

              <OpenModalButton
                className="login-button"
                buttonText={"Log In"}
                modalComponent={<LoginFormModal />}
              ></OpenModalButton>
              <OpenModalButton
                className="demo-button"
                buttonText={"Demo User"}
                modalComponent={<DemoUserModal />}
              ></OpenModalButton>
            </div>
          </section>
          <section className="models-section">
            <h2>Characters to Choose From!</h2>
            <div className="models-container">
              {models &&
                models.map((model) => (
                  // console.log("model---->", model),
                  <div key={model.id} className="model-card">
                    <img src={model.image_url} alt={model.name} />
                  </div>
                ))}
            </div>
          </section>
        </main>
      ) : (
        <div className="button-box">
          <Link to="dashboard" className="dashboard-button">
            Dashboard
          </Link>
          <Link
            to={`/character/${sessionUser.id}`}
            className="character-button"
          >
            Character
          </Link>
          <section className="models-section">
            <h2>Characters to Choose From!</h2>
            <div className="models-container">
              {models &&
                models.map((model) => (
                  // console.log("model---->", model),
                  <div key={model.id} className="model-card">
                    <img src={model.image_url} alt={model.name} />
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
      <footer>
        <div>
          Created By: Quinlan Bush
          <div>
            <a href="https://www.linkedin.com/in/quinlan-bush/">LinkedIn</a>
          </div>
          <div>
            <a href="https://github.com/Quinn5545">GitHub</a>
          </div>
          <div>
            Art Created By:{" "}
            <span>
              <a href="https://kytsune.artstation.com/">Artist</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
