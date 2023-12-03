import React from "react";
import "./Landing.css";
import { useSelector } from "react-redux";

export default function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);
  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to TaskRPG</h1>
      </header>
      <main>
        <section className="intro-section">
          <h2>TaskRPG - Your Ultimate Task Management Adventure</h2>
          <p>
            Embark on a journey of productivity and self-improvement with
            TaskRPG. Complete tasks, conquer quests, and level up your character
            as you achieve your goals. Turn your to-do list into an epic
            adventure!
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
            Ready to start your TaskRPG journey? Sign up or log in to begin your
            adventure and transform the way you tackle tasks.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="signup-button">
              Sign Up
            </a>
            <a href="/login" className="login-button">
              Log In
            </a>
          </div>
        </section>
      </main>
      <footer>{/*//TODO add credits here */}</footer>
    </div>
  );
}
