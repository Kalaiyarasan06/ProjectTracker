import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: "P001",
      title: "AI Chatbot",
      description: "A chatbot that uses NLP to answer questions.",
      startDate: "2025-01-01",
      endDate: "2025-02-01",
      gitCommit: "https://github.com/student/chatbot",
      status: "Pending",
      reviewDate: "",
    },
    {
      id: "P002",
      title: "Project Tracker",
      description: "A tracker for managing student projects.",
      startDate: "2025-01-10",
      endDate: "2025-02-15",
      gitCommit: "https://github.com/student/project-tracker",
      status: "Pending",
      reviewDate: "",
    },
    {
      id: "P003",
      title: "Diabetic Retinopathy using ML",
      description: "A Website for detecting diabetic retinopathy disease.",
      startDate: "2025-02-07",
      endDate: "2025-02-30",
      gitCommit: "https://github.com/student/project-tracker",
      status: "Pending",
      reviewDate: "",
    },
  ]);

  const navigate = useNavigate(); // For handling logout navigation

  // Handle approval or rejection
  const handleApproval = (projectId, status) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status } : project
      )
    );
  };

  // Handle review scheduling
  const handleScheduleReview = (projectId, reviewDate) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, reviewDate } : project
      )
    );
  };

  // Handle logout
  const handleLogout = () => {
    
    alert("You have been logged out.");
    navigate("/"); 
  };

  return (
    <div className="admin-dashboard">
      <h2>Faculty Dashboard</h2>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="project-list">
        <h3>Student Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Git Commit</th>
              <th>Status</th>
              <th>Review Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <a href={project.gitCommit} target="_blank" rel="noopener noreferrer">
                    View Commit
                  </a>
                </td>
                <td>{project.status}</td>
                <td>{project.reviewDate || "Not Scheduled"}</td>
                <td>
                  <button
                    onClick={() => handleApproval(project.id, "Approved")}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(project.id, "Rejected")}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                  <input
                    type="date"
                    onChange={(e) => handleScheduleReview(project.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
