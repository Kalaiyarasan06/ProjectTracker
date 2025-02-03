import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import Login from "./Pages/Login"; // Fixed path typo

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "146376685708-f3rlkc7qhdk8g5ob7g5bnmuarqpr7mbg.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}


export default App;
