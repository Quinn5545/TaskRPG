import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Landing.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);
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
              TaskRPG. Complete tasks, conquer quests, and level up your
              character as you achieve your goals. Turn your to-do list into an
              epic adventure!
            </p>
          </section>
          <section className="features-section">
            <h2>Key Features</h2>
            <ul>
              <li>Manage your tasks with a gamified approach</li>
              <li>Create characters and level up based on your achievements</li>
              <li>Embark on quests to earn rewards</li>
            </ul>
          </section>
          <section className="get-started-section">
            <h2>Get Started</h2>
            <p>
              Ready to start your TaskRPG journey? Sign up or log in to begin
              your adventure and transform the way you tackle tasks.
            </p>
            <div className="cta-buttons">
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
            </div>
          </section>
        </main>
      ) : (
        <div className="button-box">
          <div>
            <Link to="dashboard">
              <button>Dashboard</button>
            </Link>
          </div>
          <div>
            <Link to={`/character/${sessionUser.id}`}>
              <button>Character</button>
            </Link>
          </div>
        </div>
      )}
      <footer>{/*//TODO add credits here */}</footer>
    </div>
  );
}
