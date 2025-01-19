// Redesigned File: src/components/Profile.jsx


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Preview.css";

const Preview = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          id: "678c1894dae172e5e0df5860"
        }, {
          headers: {
            'Content-Type': 'application/json'  // Ensure the content type is set correctly
          }
        });
        setData(response.data);  // Set the received data in the state
      } catch (error) {
        setError(error);  // Handle any errors
      }
    };

    fetchData();
  }, []); 

  console.log(data);



  //
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    projects: [
      {
        title: "Sample Project",
        description: "A brief description of the sample project.",
        externalLink: "https://github.com/example",
        videoLink: "https://www.youtube.com/watch?v=example",
        image: "https://via.placeholder.com/150",
      },
    ],
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    externalLink: "",
    videoLink: "",
    image: "",
  });

  const handleAddProject = () => {
    setIsAdding(true);
  };

  const handleSubmitProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, newProject],
    });
    setNewProject({ title: "", description: "", externalLink: "", videoLink: "", image: "" });
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      <div className="user-details">
        <h2>{formData.name}</h2>
        <p>{formData.email}</p>
      </div>

      <div className="projects-section">
        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div className="project-detail" key={index}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
              GitHub Repo
            </a>
            {project.videoLink && (
              <a href={project.videoLink} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            )}
            {project.image && <img src={project.image} alt="Project" />}
          </div>
        ))}
        <button className="add-project-btn" onClick={handleAddProject}>
          Add New Project
        </button>
      </div>

      {isAdding && (
        <div className="add-project-form">
          <h3>Add New Project</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="Enter project title"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleChange}
              placeholder="Enter project description"
            ></textarea>
          </label>
          <label>
            GitHub Link:
            <input
              type="url"
              name="externalLink"
              value={newProject.externalLink}
              onChange={handleChange}
              placeholder="Enter GitHub repository link"
            />
          </label>
          <label>
            Video Link:
            <input
              type="url"
              name="videoLink"
              value={newProject.videoLink}
              onChange={handleChange}
              placeholder="Enter video link"
            />
          </label>
          <label>
            Image URL:
            <input
              type="url"
              name="image"
              value={newProject.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </label>
          <button className="submit-project-btn" onClick={handleSubmitProject}>
            Submit Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;
