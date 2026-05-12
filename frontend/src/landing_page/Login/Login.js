import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:3002/login",
                {
                    phone,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );
            alert("login successfull")
            

        }
        catch(err){

            alert(
                err.response.data.message
            );

        }

    };




  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="https://kite.zerodha.com/static/images/kite-logo.svg"
            alt="kite"
            className="kite-logo"
          />
        </div>

        {/* Heading */}
        <h2 className="login-title">Login to Kite</h2>

        {/* Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone number"
            className="form-control custom-input"
            onChange={(e)=>
                    setPhone(e.target.value)
                }
          />
        </div>

        {/* Password */}
        <div className="password-box mb-4">

          <input
            type="password"
            placeholder="Password"
            className="form-control custom-input"
            
            onChange={(e)=>
                    setPassword(e.target.value)
                }
          />

          <span className="eye-icon">
            👁️
          </span>

        </div>

        {/* Button */}
        <button className="btn login-btn" onClick={handleLogin}>
          Login
        </button>

        {/* Forgot */}
        <a className="forgot-text">
          Forgot user ID or password?
        </a>

      </div>

      {/* Bottom Section */}
      <div className="bottom-section">

        <div className="store-icons">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="playstore"
            className="store-img"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="apple"
            className="apple-img"
          />
        </div>

        <p className="signup-text">
          Don't have an account? <span><a href="/signup">Sign up</a></span> for free!
        </p>

        <p className="footer-text">
          Zerodha Broking Limited: Member of NSE, BSE, MCX
        </p>

      </div>

    </div>
  );
}

export default Login;