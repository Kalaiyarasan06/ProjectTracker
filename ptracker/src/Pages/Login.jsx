import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css"; 
import logo from "../assets/logo.png"; 

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const payload = JSON.parse(atob(credentialResponse.credential.split(".")[1])); 
      console.log("Google login payload:", payload);

      const email = payload.email;
      const adminEmailDomain = "@bitsathy.ac.in"; 
      const studentEmailDomain = "@gmail.com"; 

      if (email.endsWith(adminEmailDomain)) {
        navigate("/admin-dashboard", { state: { role: "admin", user: payload } });
      } else if (email.endsWith(studentEmailDomain)) {
        navigate("/student-dashboard", { state: { role: "student", user: payload } });
      } else {
        setError("Unauthorized email domain. Please use a valid email.");
      }
    } catch (error) {
      console.error("Error parsing Google login response:", error);
      setError("Failed to process Google login. Please try again.");
    }
  };

  const handleGoogleLoginFailure = () => {
    setError("Google Sign-In failed! Please try again.");
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo" />
      </div>
      <h1 className="project-name">Student Project Tracker</h1>

      {/* Google Sign-In */}
      <div id="signInbutton">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        />
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
