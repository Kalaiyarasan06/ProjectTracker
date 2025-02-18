import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import Login from "./Pages/Login"; // Fixed path typo

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

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
