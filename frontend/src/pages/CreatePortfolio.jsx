import React, { useState } from "react";
import "./CreatePortfolio.css";

const CreatePortfolio = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    projects: [{ title: "", description: "", externalLink: "" }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "projects") {
      const updatedProjects = [...formData.projects];
      updatedProjects[index][e.target.dataset.field] = value;
      setFormData({ ...formData, projects: updatedProjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", externalLink: "" },
      ],
    });
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Portfolio Data Submitted:", formData);
    alert("Portfolio created successfully!");
    // Here you can integrate API calls to save the portfolio
  };

  return (
    <div className="create-portfolio">
      <h1>Create Your Portfolio</h1>
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="E.g. React, Node.js, Python"
          required
        />

        <div className="projects-section">
          <label>Projects:</label>
          {formData.projects.map((project, index) => (
            <div className="project-input" key={index}>
              <label htmlFor={`title-${index}`}>Project Title:</label>
              <input
                type="text"
                id={`title-${index}`}
                name="projects"
                data-field="title"
                value={project.title}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter project title"
                required
              />

              <label htmlFor={`description-${index}`}>Project Description:</label>
              <textarea
                id={`description-${index}`}
                name="projects"
                data-field="description"
                value={project.description}
                onChange={(e) => handleChange(e, index)}
                placeholder="Describe the project"
                required
              ></textarea>

              <label htmlFor={`externalLink-${index}`}>External Link:</label>
              <input
                type="url"
                id={`externalLink-${index}`}
                name="projects"
                data-field="externalLink"
                value={project.externalLink}
                onChange={(e) => handleChange(e, index)}
                placeholder="Add external link"
                required
              />

              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveProject(index)}
              >
                Remove Project
              </button>
            </div>
          ))}
          <button type="button" className="add-project-btn" onClick={handleAddProject}>
            Add Another Project
          </button>
        </div>

        <button type="submit" className="submit-btn">Create Portfolio</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
