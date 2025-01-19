import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import PortfolioCard from "./PortfolioCard";

const Profile = () => {
  return (
    <div className="profile">
      <h1>Profile Component</h1>
      <p>This is the Profile component. Add your profile details here.</p>
    </div>
  );
};

const Dashboard = () => {
  const reloadPage = () => {
    window.location.reload(); // Reloads the current page
  };
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: "John Doe", status: "Published" },
    { id: 2, name: "Jane Smith", status: "Draft" },
    { id: 3, name: "Michael Lee", status: "Published" },
  ]);

  const [showDashboard, setShowDashboard] = useState(true);
  const[UserProfile,setUserProfile]=useState({});
  useEffect(() => {
    // console.log("UserProfile updated:", UserProfile);
  }, [UserProfile]);

  // Function to fetch data from the API
  const fetchPortfolios = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        const apiPortfolios = data.data.map((portfolio, index) => ({
          id: index + 1,
          name: portfolio.name,
          status: "Published",
          project: portfolio.Project,
        }));
        setPortfolios(apiPortfolios);
      } else {
        console.error("Failed to fetch portfolios:", data);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  // Using useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div>
      {showDashboard ? (
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div className="portfolio-list">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="portfolio-card">
                <h2>{portfolio.name}</h2>
                <p>
                  Status:{" "}
                  <span className={portfolio.status.toLowerCase()}>
                    {portfolio.status}
                  </span>
                </p>
                <button
                  className="view-btn"
                  onClick={() => {
                    setUserProfile(portfolio);
                    setShowDashboard(false);
                    // console.log(UserProfile);
                    // console.log(portfolio);
                   
                  }} // Hide Dashboard and show Profile
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <><PortfolioCard profileData={UserProfile}/>
        <button className="view-btn"
                 onClick={reloadPage}>
        Back
        </button>
        </>
        
        
         // Render Profile component
        
      )}
    </div>
  );
};

export default Dashboard;
