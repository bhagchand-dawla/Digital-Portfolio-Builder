import React from "react";
import "./PortfolioCard.css"; // Add CSS styles for the component

const PortfolioCard = ({ profileData }) => {
  console.log(profileData);
  if (!profileData) {
    return <div className="portfolio-card">Loading...</div>;
  }

  const { name, project } = profileData;

  return (
    <div className="portfolio-card1">
      <div className="profile-header">
        <h1 className="user-name">{name}</h1>
        <p className="user-description">Check out the amazing projects below!</p>
      </div>

      <div className="projects-list">
        {project.map((project, index) => (
          <div key={index} className="project-card">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                View on GitHub
              </a>
              {project.videoLink && (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-video"
                >
                  Watch Video
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioCard;

