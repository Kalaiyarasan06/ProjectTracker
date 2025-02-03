import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("create"); 
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    studentRollNo: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    gitCommit: "",
    status: "Initiated", 
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [editProjectId, setEditProjectId] = useState(null); 

  const navigate = useNavigate(); 

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle project creation
  const handleCreateProject = (e) => {
    e.preventDefault();
    setProjects([...projects, project]);
    setProject({
      studentRollNo: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      gitCommit: "",
      status: "Initiated",
    }); 
    alert("Project created successfully!");
  };

  // Handle project editing
  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find((proj) => proj.studentRollNo === projectId);
    setProject(projectToEdit);
    setIsEditing(true);
    setEditProjectId(projectId);
    setActiveTab("create"); 
  };

  // Handle saving edited project
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.studentRollNo === editProjectId ? { ...project } : proj
      )
    );
    setProject({
      studentRollNo: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      gitCommit: "",
      status: "Initiated", 
    }); // Reset form
    setIsEditing(false);
    setEditProjectId(null);
    alert("Project updated successfully!");
  };

  // Handle deleting a project
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((proj) => proj.studentRollNo !== projectId));
    alert("Project deleted successfully!");
  };

  // Handle logout
  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/"); 
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>

      {/* Tabs Navigation */}
      <div className="tabs">
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => {
            setActiveTab("create");
            setIsEditing(false); // 
            setProject({
              studentRollNo: "",
              title: "",
              description: "",
              startDate: "",
              endDate: "",
              gitCommit: "",
              status: "Initiated", // Reset status to default
            });
          }}
        >
          {isEditing ? "Edit Project" : "Create Project"}
        </button>
        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
          View Projects
        </button>
        <button
          className={activeTab === "extras" ? "active" : ""}
          onClick={() => setActiveTab("extras")}
        >
          Extras
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "create" && (
          <div className="project-creation-form">
            <h3>{isEditing ? "Edit Project" : "Create a New Project"}</h3>

            <form onSubmit={isEditing ? handleSaveEdit : handleCreateProject}>
              <label htmlFor="student-rollno">Student Roll No</label>
              <input
                type="text"
                id="student-rollno"
                name="studentRollNo"
                placeholder="Enter Student Roll No"
                value={project.studentRollNo}
                onChange={handleInputChange}
                required
                 // Disable Roll No field during editing
              />

              <label htmlFor="project-title">Project Title</label>
              <input
                type="text"
                id="project-title"
                name="title"
                placeholder="Enter Project Title"
                value={project.title}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="project-description">Project Description</label>
              <textarea
                id="project-description"
                name="description"
                placeholder="Enter Project Description"
                value={project.description}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={project.startDate}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                name="endDate"
                value={project.endDate}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="git-commit">Git Commit</label>
              <input
                type="text"
                id="git-commit"
                name="gitCommit"
                placeholder="Enter Git Commit URL"
                value={project.gitCommit}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="project-status">Status</label>
              <input
                type="text"
                id="project-status"
                name="status"
                value={project.status}
                disabled // Status is fixed as "Initiated"
              />

              <button type="submit">
                {isEditing ? "Save Changes" : "Create Project"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "view" && (
          <div className="created-projects">
            <h3>Your Created Projects</h3>
            {projects.length === 0 ? (
              <p>No projects created yet.</p>
            ) : (
              <ul>
                {projects.map((proj) => (
                  <li key={proj.studentRollNo}>
                    <h4>{proj.title}</h4>
                    <p>{proj.description}</p>
                    <p>Start Date: {proj.startDate}</p>
                    <p>End Date: {proj.endDate}</p>
                    <p>
                      Git Commit:{" "}
                      <a
                        href={proj.gitCommit}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {proj.gitCommit}
                      </a>
                    </p>
                    <p>Status: {proj.status}</p>
                    <button onClick={() => handleEditProject(proj.studentRollNo)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProject(proj.studentRollNo)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "extras" && (
          <div className="extras">
            <h3>Extras</h3>
            <p>Additional features can be added here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
