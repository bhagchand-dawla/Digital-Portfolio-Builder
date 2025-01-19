import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Assuming a dedicated CSS file for this page

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to the Digital Portfolio Builder</h1>
        <p>
          Build and showcase your digital portfolio with ease. Select templates,
          integrate code, and highlight your skills.
        </p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="btn primary">
            Get Started
          </Link>
          <Link to="/about" className="btn secondary">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Interactive Portfolio Templates</h3>
            <p>Select and customize templates to suit your style and needs.</p>
          </div>
          <div className="feature-item">
            <h3>Code Integration</h3>
            <p>
              Embed GitHub repositories or live code demos directly into your
              portfolio.
            </p>
          </div>
          <div className="feature-item">
            <h3>Multimedia Support</h3>
            <p>
              Add videos, images, and presentations to enrich your portfolio.
            </p>
          </div>
          <div className="feature-item">
            <h3>Skill Showcase</h3>
            <p>
              Highlight your skills, certifications, and projects with proof
              links.
            </p>
          </div>
          <div className="feature-item">
            <h3>Easy Sharing</h3>
            <p>
              Share your portfolio with unique links tailored for employers or
              peers.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <p>
              "The Digital Portfolio Builder helped me land my dream job! The
              customizable templates and code integration are fantastic."
            </p>
            <span>- Alex</span>
          </div>
          <div className="testimonial-item">
            <p>
              "I was able to showcase my skills effortlessly. Sharing my
              portfolio with employers has never been easier!"
            </p>
            <span>- Priya</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
